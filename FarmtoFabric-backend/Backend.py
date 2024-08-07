from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import mysql.connector
from datetime import datetime 
import pandas as pd
import pickle

with open('rf_model.pkl', 'rb') as model_file:
    rf_model = pickle.load(model_file)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="root",
  database ="mydatabase"
)

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight Request Handled'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        return response


api = Api(app)


# mycursor = mydb.cursor()

class Login(Resource):
    def post(self):
        try:
            data = request.get_json()
            uname = data['uname']
            upass = data['upass']
            loginas = data['signinas']

            cur = mydb.cursor()

            if(loginas == "User"):
                cur.execute("SELECT id , uname , password FROM users WHERE uname = %s and password = %s ",(uname,upass))
                user = cur.fetchone()
            elif(loginas == "ServiceProvider"):
                cur.execute("SELECT id , sname , password FROM sproviders WHERE sname = %s and password = %s ",(uname,upass))
                user = cur.fetchone()
            else :
                cur.execute("SELECT id, fname , password FROM farmers WHERE fname = %s and password = %s ",(uname,upass))
                user = cur.fetchone()
            
            cur.close()
            
            if user:
                return {"msg": "login successfully",'id':user[0] , 'name':user[1]}
            else:
                result = loginas + " not found" 
                return{"error": result}
        except mysql.connector.Error as e:
            return {"error": str(e)}, 500
        
class Register(Resource):
    def post(self):
        try:
            data = request.get_json()
            uname = data['uname']
            upass = data['upass']
            loginas = data['signupas']
            uemail = data['email']

            cur = mydb.cursor()

            if(loginas == "User"):
                cur.execute("SELECT uname , password FROM users WHERE uname = %s or password = %s ",(uname,upass))
                user = cur.fetchone()
                if(user):
                    return{"msg":"username or password already exist"}
                else:
                    cur.execute("insert into users(uname,password,email) values (%s,%s,%s)",(uname,upass,uemail))
                    mydb.commit()
                    return {"msg":"record added"}
                
            elif(loginas == "ServiceProvider"):
                cur.execute("SELECT sname , password FROM sproviders WHERE sname = %s or password = %s ",(uname,upass))
                sprovider = cur.fetchone()
                if(sprovider):
                    return{"msg":"username or password already exist"}
                cur.execute("insert into sproviders(sname,password,email) values (%s,%s,%s)",(uname,upass,uemail))
                mydb.commit()
                return {"msg":"record added"}
            else :
                cur.execute("SELECT fname , password FROM farmers WHERE fname = %s or password = %s ",(uname,upass))
                farmer = cur.fetchone()
                if(farmer):
                     return{"msg":"username or password already exist"}
                cur.execute("insert into farmers(fname,password,email) values (%s,%s,%s)",(uname,upass,uemail))
                mydb.commit()
                return {"msg":"record added"}

        except mysql.connector.Error as e:
            return {"error": str(e)}, 500

class PredictQuality(Resource):
    def post(self):
        
        input_data = request.get_json()

        data = pd.read_csv('wool_quality_dataset.csv')

        # Encode categorical variables
        X = pd.get_dummies(data[['Fiber_Diameter', 'Length', 'Color', 'Crimp', 'Cleanliness']])

        # Get the JSON data from the request
        

        # Create a DataFrame from the JSON data
        input_data_df = pd.DataFrame([input_data])

        # One-hot encode categorical variables in the input data
        input_data_encoded = pd.get_dummies(input_data_df)

        # Reindex the input data DataFrame to match the columns in the dataset
        input_data_encoded = input_data_encoded.reindex(columns=X.columns, fill_value=0)

        prediction = rf_model.predict(input_data_encoded)

        # Return the prediction as JSON
        return jsonify({'prediction': prediction[0]})

class WoolProducts(Resource):
    def get(self):
        try:
            cur = mydb.cursor()
            cur.execute("SELECT * FROM products")
            products = cur.fetchall()
            col_names = [desc[0] for desc in cur.description]
        
            products_dict = []
            for row in products:
               row_dict = {}
               for i, col_name in enumerate(col_names):
                    row_dict[col_name] = row[i]
               products_dict.append(row_dict)
            cur.close()
            return jsonify(products_dict)
        except mysql.connector.Error as e:
            return {'error' : str(e)}

    def post(self):
        try:
            data = request.get_json()
            data['created_at'] = datetime.now()
            data['updated_at'] = datetime.now()
            cur = mydb.cursor()
            cur.execute("INSERT INTO products (title,description,category,imgpath,mrp,price,created_at, updated_at) VALUES (%s, %s, %s, %s, %s, %s , %s ,%s)", 
                        (data['title'],data['desc'],data['category'],data['imgpath'],data['mrp'],data['price'],data['created_at'],data['updated_at'],))
            mydb.commit()
            cur.close()
            return {'message': 'Product added successfully'}, 201
        except mysql.connector.Error as e:
            return {'error' : str(e)}

class WoolProduct(Resource):
    def put(self, product_id):
        try:
            data = request.get_json()
            data['updated_at'] = datetime.now()
            cur = mydb.cursor()
            cur.execute("select * from products where id = %s",(product_id,))
            result = cur.fetchall()
            print(result)
            if result:
                cur.execute("UPDATE products SET title = %s,description = %s , category = %s , imgpath = %s , mrp = %s, price = %s, updated_at = %s WHERE id = %s", 
                            (data['title'],data['desc'],data['category'],data['imgpath'] , data['mrp'] , data['price'], data['updated_at'], product_id ,))
                mydb.commit()
                cur.close()   
                return {'message': 'Product updated successfully'}, 200
            else :
                return {'message':"id does not exist"}
        except mysql.connector.Error as e:
            return {'error' : str(e)}
        

    def delete(self, product_id):
        try:
            cur = mydb.cursor()
            cur.execute("DELETE FROM products WHERE id = %s", (product_id,))
            mydb.commit()
            cur.close()
            return {'message': 'Product deleted successfully'}, 200
        except mysql.connector.Error as e:
            return {'error' : str(e)}

    def get(self, product_id):
        try:
            cur = mydb.cursor()
            cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
            product = cur.fetchone()
            cur.close()
            if product:
                return jsonify(product)
            return {'error': 'Product not found'}, 404
        except mysql.connector.Error as e:
            return {'error' : str(e)}

class SearchItem(Resource):
    def get(self,name):
        try:
            cur = mydb.cursor()
            print(name)
            cur.execute("SELECT * FROM products WHERE title = %s", (name,))
            product = cur.fetchone()
            col_names = [desc[0] for desc in cur.description]
        
            products_dict = []
            for row in product:
               row_dict = {}
               for i, col_name in enumerate(col_names):
                    row_dict[col_name] = row[i]
               products_dict.append(row_dict)
            cur.close()
            return jsonify(products_dict)
        except mysql.connector.Error as e:
            return {'error' : str(e)}
    
class Categories(Resource):
    def post(self):
        try:
            data = request.get_json()
            data['created_at'] = datetime.now()
            data['updated_at'] = datetime.now()
            cur = mydb.cursor()
            cur.execute("insert into categories (cname,created_at,updated_at) values (%s,%s,%s)",(data['cname'],data['created_at'],data['updated_at'],))
            mydb.commit()
            cur.close()
            return {"message :" "category added successfully"}
        except mysql.connector.Error as e:
            return {'error' : str(e)}
    def get(self):
        try:
            cur = mydb.cursor()
            cur.execute("SELECT * FROM categories")
            products = cur.fetchall()
            cur.close()
            if products:
                return jsonify(products)
            else :
                return {'message':"data not found"}
        except mysql.connector.Error as e:
            return {'error' : str(e)}
    
class Category(Resource):
    def delete(self, product_id):
        try:
            cur = mydb.cursor()
            cur.execute("DELETE FROM categories WHERE id = %s", (product_id,))
            mydb.commit()
            cur.close()
            return {'message': 'category deleted successfully'}, 200
        except mysql.connector.Error as e:
            return {'error' : str(e)}

api.add_resource(Login, '/login')
api.add_resource(Register,'/register')
api.add_resource(PredictQuality, '/predict')
api.add_resource(WoolProducts, '/products')
api.add_resource(WoolProduct,'/product/<int:product_id>')
api.add_resource(SearchItem,'/searchproduct/<string:name>')
api.add_resource(Categories ,'/categories')
api.add_resource(Category,'/category/<int:product_id>')



if __name__ == '__main__':
    app.run(debug=True)