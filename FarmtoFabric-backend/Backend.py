from flask import Flask, request, jsonify,url_for
from flask_restful import Api, Resource
from flask_cors import CORS
import mysql.connector
from datetime import datetime 
import pandas as pd
import pickle
from werkzeug.utils import secure_filename
import os , json
from decimal import Decimal

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

UPLOAD_FOLDER = 'static/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.before_request
def before_request():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight Request Handled'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
        return response


api = Api(app)


class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')  # Format datetime fields
        return json.JSONEncoder.default(self, obj)

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
                if(not user):
                    cur.execute("select uname from users where uname = %s",(uname,))
                    user = cur.fetchone()
                    if(user) : return {"error":"password is incorrect"}
            elif(loginas == "ServiceProvider"):
                cur.execute("SELECT id , sname , password FROM sproviders WHERE sname = %s and password = %s ",(uname,upass))
                user = cur.fetchone()
                if(not user):
                    cur.execute("select sname from sproviders where sname = %s",(uname,))
                    user = cur.fetchone()
                    if(user) : return {"error":"password is incorrect"}
            else :
                cur.execute("SELECT id, fname , password FROM farmers WHERE fname = %s and password = %s ",(uname,upass))
                user = cur.fetchone()
                if(not user):
                    cur.execute("select fname from farmers where fname = %s",(uname,))
                    user = cur.fetchone()
                    if(user) : return {"error":"password is incorrect"}
            
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
        

        # Create a DataFrame from the JSON data
        input_data_df = pd.DataFrame([input_data])

        # One-hot encode categorical variables in the input data
        input_data_encoded = pd.get_dummies(input_data_df)

        # Reindex the input data DataFrame to match the columns in the dataset
        input_data_encoded = input_data_encoded.reindex(columns=X.columns, fill_value=0)

        prediction = rf_model.predict(input_data_encoded)

        # Return the prediction as JSON
        return jsonify({'prediction': prediction[0]})


class Products(Resource):
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

class WoolProducts(Resource):
    def get(self,sid):
        try:
            cur = mydb.cursor()
            cur.execute("SELECT * FROM products where sid = %s",(sid,))
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
            if 'image' not in request.files:
              return jsonify({'error': 'No image part'}), 400
        
            file = request.files['image']
            if file.filename == '':
                return jsonify({'error': 'No selected file'}), 400

            if file:
                filename = secure_filename(file.filename)
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(image_path)  # Save image in the permanent folder

                # Generate URL to access the image
                image_url = url_for('static', filename=f'uploads/{filename}', _external=True)
                # return jsonify({'message': 'Image uploaded successfully!', 'image_url': image_url}), 200
            
                title = request.form.get('title')
                desc = request.form.get('desc')
                mrp = request.form.get('mrp')
                price = request.form.get('price')
                sid = request.form.get('sid')

                # Insert into database
                cur = mydb.cursor()
                query = """
                    INSERT INTO products (title, description, imgpath, mrp, price, created_at, updated_at,sid) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s,%s)
                """
                cur.execute(query, (title, desc, image_url, mrp, price, datetime.now(), datetime.now(),sid))
                mydb.commit()
                cur.close()
                return {'message': 'Product added successfully'}, 201
        except mysql.connector.Error as e:
            return jsonify({'error' : str(e)})



class WoolProduct(Resource):
    def put(self, product_id):
        try:
            # Check if the image file is part of the request
            if 'image' not in request.files:
                return {'error': 'No image part'}, 400

            file = request.files['image']
            if file.filename == '':
                return {'error': 'No selected file'}, 400

            # Save the image if the file exists
            image_url = None  # Default to None if no image is provided
            if file:
                filename = secure_filename(file.filename)
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(image_path)  # Save image in the permanent folder

                # Generate URL to access the image
                image_url = url_for('static', filename=f'uploads/{filename}', _external=True)

            # Get other form data (title, description, mrp, price) from request
            title = request.form.get('title')
            desc = request.form.get('desc')
            mrp = request.form.get('mrp')
            price = request.form.get('price')

            # Ensure that at least one field (image, title, desc, etc.) has been provided for update
            if not title and not desc and not mrp and not price and not image_url:
                return {'error': 'No data to update'}, 400

            cur = mydb.cursor()

            # Check if product exists
            cur.execute("SELECT * FROM products WHERE id = %s", (product_id,))
            result = cur.fetchall()

            if result:
                # Prepare values for update; use existing values if new values are not provided
                updated_title = title if title else result[0][1]  # Assuming title is at index 1
                updated_desc = desc if desc else result[0][2]    # Assuming description is at index 2
                updated_mrp = mrp if mrp else result[0][4]       # Assuming MRP is at index 4
                updated_price = price if price else result[0][5]  # Assuming price is at index 5
                updated_at = datetime.now()

                query = """UPDATE products 
                           SET title = %s, description = %s, imgpath = %s, mrp = %s, price = %s, updated_at = %s 
                           WHERE id = %s"""
                cur.execute(query, (updated_title, updated_desc, image_url, updated_mrp, updated_price, updated_at, product_id))
                mydb.commit()
                cur.close()

                return {'message': 'Product updated successfully'}, 200
            else:
                return {'error': 'Product ID does not exist'}, 404

        except mysql.connector.Error as e:
            return {'error': str(e)}, 500
        except Exception as e:  # Catch any other exceptions
            return {'error': str(e)}, 500
        

    def delete(self, product_id):
        try:
            cur = mydb.cursor()

            # Check if product exists and fetch the image path
            cur.execute("SELECT imgpath FROM products WHERE id = %s", (product_id,))
            result = cur.fetchone()
            
            if result:
                image_path = result[0]  # Assuming imgpath is at index 0
                
                # Delete the image file if it exists
                if image_path and os.path.isfile(image_path):
                    os.remove(image_path)
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
            # Debug print for name variable
            print(name)
            
            # Use parameterized query to prevent SQL injection
            query = "SELECT * FROM products WHERE description LIKE %s"
            cur.execute(query, ('%' + name + '%',))
              
            # Fetch all matching rows
            products = cur.fetchall()
            col_names = [desc[0] for desc in cur.description]
            
            # Create a list of dictionaries to store each product's data
            products_dict = []
            for row in products:
                row_dict = {}
                for i, col_name in enumerate(col_names):
                    row_dict[col_name] = row[i]
                products_dict.append(row_dict)
            
            cur.close()
            return jsonify(products_dict)
       except mysql.connector.Error as e:
            return jsonify({'error': str(e)}), 500
    
class User(Resource):
    def get(self):
        try:
            cur = mydb.cursor()
            cur.execute("SELECT * FROM users") 
            user = cur.fetchall()
            cur.close()
            if user:
                return jsonify(user)
            else :
                return {'message':"data not found"}
        except mysql.connector.Error as e:
            return {'error' : str(e)}
        

class sproviders(Resource):
    def get(self):
        try:
            cur = mydb.cursor()

            cur.execute( "SELECT * FROM sproviders")
                
                # Fetch the results
            service_providers = cur.fetchall()

            cur.close()
                
            if service_providers:
                return jsonify(service_providers)
            else:
                return {"message": "No service providers found ."}, 404
                
        except Exception as e:
            return {"message": f"Error fetching data: {e}"}, 500
        
class ResetPassword(Resource):
    def post(self):
        # return {"message":"changed"}
        data = request.get_json()
        
        username = data.get('username')
        new_password = data.get('newPassword')
        role = data.get('role')

        # Validate input data (you can add more validation as needed)
        if not username or not new_password or not role:
            return {'message': 'All fields are required.'}, 400

        curr = mydb.cursor()
        # Example SQL query to update user password (change this based on your schema)
        try:
            if(role == "User"):
                curr.execute("update users set password = %s WHERE uname = %s",(new_password,username))
            elif(role == "ServiceProvider"):
                curr.execute("update sproviders set password = %s WHERE sname = %s ",(new_password,username))
            else :
                curr.execute("update farmers set password = %s WHERE fname = %s ",(new_password,username))
            mydb.commit()
            return {'message': 'Password changed successfully.'}, 200
        except Exception as e:
            return {'message': 'Error changing password.', 'error': str(e)}, 500
        finally:
            curr.close()

          
class Carts(Resource):
    def post(self):
        data = request.get_json()
        product_id = data.get('product_id')
        user_id = data.get('user_id')
        quantity = data.get('quantity', 1)  # Default quantity to 1 if not provided

        if not product_id or not user_id:
            return {'error': 'Missing product_id or user_id'}, 400
        
        # Connect to the database
        cursor = mydb.cursor()
        try:
            
            # Check if the product is already in the cart for this user
            cursor.execute("SELECT id FROM carts WHERE product_id = %s AND user_id = %s", (product_id, user_id))
            cart_item = cursor.fetchone()

            if cart_item:
                # If the product is already in the cart, update the quantity
                cursor.execute("UPDATE carts SET quantity = quantity + %s WHERE id = %s", (quantity, cart_item[0]))
            else:
                # If the product is not in the cart, insert a new entry
                cursor.execute(
                    "INSERT INTO carts (product_id, user_id, quantity) VALUES (%s, %s, %s)",
                    (product_id, user_id, quantity)
                )

            mydb.commit()
            return {'message': 'Product added to cart successfully'}, 200

        except Exception as e:
            print(f"Error: {e}")
            return {'error': 'Failed to add product to cart'}, 500

        finally:
            cursor.close()

    def get(self, user_id):
        try:
            cursor = mydb.cursor(dictionary=True)
            query = '''
            SELECT c.id as cart_id, p.id as product_id, p.title, p.price, c.quantity, p.imgpath
            FROM carts c
            JOIN products p ON c.product_id = p.id
            WHERE c.user_id = %s
            '''
            cursor.execute(query, (user_id,))
            cart_items = cursor.fetchall()

            if cart_items:
                return {'cart_items': cart_items}, 200  # Return the cart items as JSON
            else:
                return {'cart_items': []}  # Return an empty array if no items found

        except Exception as e:
            # print(f"Error: {e}")
            return {'error': 'Failed to retrieve cart items'}
        finally:
            cursor.close()

    def delete(self,user_id):
        cursor = mydb.cursor()
        try:  
            cursor.execute("DELETE FROM carts WHERE user_id = %s", (user_id,))
            mydb.commit()
            return {'message': 'Cart cleared successfully'}, 200
        except Exception as e:
            print(f"Error clearing cart: {e}")
            return {'error': 'Failed to clear cart'}, 500
        finally:
            cursor.close()

class Cart(Resource):
    def delete(self, user_id, product_id):
        try:
            cursor = mydb.cursor()

            # Query to delete the product from the user's cart
            delete_query = 'DELETE FROM carts WHERE user_id = %s AND product_id = %s'
            cursor.execute(delete_query, (user_id, product_id))

            mydb.commit()

            if cursor.rowcount > 0:
                return {'message': 'Item removed from cart'}, 200
            else:
                return {'error': 'Item not found in cart'}, 404

        except Exception as e:
            # print(f"Error: {e}")
            return {'error': 'Failed to delete item from cart'}, 500

        finally:
            cursor.close()

class Order(Resource):
    def post(self):
        data = request.get_json()

        # Extracting necessary fields from the request
        items = data.get('items')  # Expecting a list of items
        user_id = data.get('user_id')
        shipping_address = data.get('shipping_address')
        city = data.get('city')
        pincode = data.get('pincode')
        total_price = data.get('total_price')

        # Validate that required fields are present
        if not items or not shipping_address or not city or not pincode or not user_id:
            return {'error': 'Missing required fields'}, 400

        cursor = None
        try:
            # Step 1: Insert into the Orders table
            cursor = mydb.cursor()
            cursor.execute(
                """
                INSERT INTO orders (user_id, shipping_address, city, pincode, total_price)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (user_id, shipping_address, city, pincode, total_price)
            )
            
            # Get the generated order ID for linking with order items
            order_id = cursor.lastrowid

            # Step 2: Insert each item into the OrderItems table
            for item in items:
                product_id = item.get('product_id')
                quantity = item.get('quantity', 1)  # Default quantity to 1 if not provided
                individual_price = item.get('price')  # Using price per item
                
                if not product_id or individual_price is None:
                    return {'error': 'Missing required fields in order items'}, 400

                cursor.execute(
                    """
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (%s, %s, %s, %s)
                    """,
                    (order_id, product_id, quantity, individual_price)
                )

            # Commit the transaction after inserting both the order and its items
            mydb.commit()

            return {'message': 'Order placed successfully', 'order_id': order_id}, 201

        except mysql.connector.Error as e:
            if cursor:
                mydb.rollback()  # Rollback in case of error
            return {'error': f'Failed to place order: {e}'}, 500

        finally:
            if cursor:
                cursor.close()  # Ensure the cursor is closed after the operation

    def get(self, user_id):
        cursor = None
        try:
            cursor = mydb.cursor(dictionary=True)
            query = '''
                SELECT o.order_id, o.total_price, o.shipping_address, o.city, o.pincode, o.order_date, o.status,
                    JSON_UNQUOTE(JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'product_id', oi.product_id,
                            'quantity', oi.quantity,
                            'price', oi.price,
                            'total_price', oi.price * oi.quantity
                        )
                    )) AS products
                FROM orders o
                JOIN order_items oi ON o.order_id = oi.order_id
                WHERE o.user_id = %s
                GROUP BY o.order_id
                '''

            # Log the query for debugging
            # print(f"Executing query: {query} with user_id: {user_id}")
            
            # Execute the query and fetch results
            cursor.execute(query, (user_id,))
            orders = cursor.fetchall()

            # Log the results for debugging
            # print(f"Fetched orders: {orders}")
            
            # Return the orders with products array
            return jsonify({'orders': orders})

        except Exception as e:
            # Log the error for debugging
            print(f"Error occurred: {str(e)}")
            return {'error': str(e)}, 500  # Handle unexpected errors

        finally:
            if cursor:
                cursor.close()  # Ensure cursor is closed after execution


class AllOrdersAPI(Resource):
    def get(self, sid):
        cursor = None
        try:
            cursor = mydb.cursor(dictionary=True)
            
            # Updated query with service provider id placeholder
            query = '''
               SELECT 
                        o.order_id, 
                        o.user_id, 
                        o.total_price, 
                        o.shipping_address, 
                        o.city, 
                        o.pincode, 
                        o.order_date, 
                        o.status,
                        JSON_UNQUOTE(JSON_ARRAYAGG(
                            JSON_OBJECT(
                                'product_id', oi.product_id,
                                'quantity', oi.quantity,
                                'price', p.price,
                                'total_price', p.price * oi.quantity
                            )
                        )) AS products
                    FROM orders o
                    JOIN order_items oi ON o.order_id = oi.order_id
                    JOIN products p ON oi.product_id = p.id
                    WHERE p.sid = %s
                    GROUP BY o.order_id;
                '''
            
            # Execute the query with the service provider ID (sid)
            cursor.execute(query, (sid,))  # Pass sid as a tuple to match %s
            
            # Fetch all results
            orders = cursor.fetchall()

            # Return the result as JSON
            return jsonify({'orders': orders})

        except Exception as e:
            # Log the error for debugging
            print(f"Error occurred: {str(e)}")
            return {'error': str(e)}, 500  # Handle unexpected errors

        finally:
            if cursor:
                cursor.close()  # Close the cursor after usage

         

api.add_resource(Login, '/login')
api.add_resource(Register,'/register')
api.add_resource(PredictQuality, '/predict')
api.add_resource(WoolProducts,'/products')
api.add_resource(Products,'/prod')
api.add_resource(WoolProducts, '/products/<int:sid>' , endpoint='get_product')
api.add_resource(WoolProduct,'/product/<int:product_id>')
api.add_resource(SearchItem,'/searchproduct/<string:name>')
api.add_resource(User,'/users')
api.add_resource(sproviders,'/sproviderlist')
api.add_resource(ResetPassword,'/pass')
api.add_resource(Carts,'/cart')
api.add_resource(Carts,'/cart/<int:user_id>',endpoint='delete_cart')
api.add_resource(Carts,'/cart/<int:user_id>' , endpoint='user_cart')
api.add_resource(Cart,'/cart/<int:user_id>/<int:product_id>',endpoint='product_cart_item')
api.add_resource(Order,'/orders')
api.add_resource(Order,'/orders/<int:user_id>',endpoint='user_order')
api.add_resource(AllOrdersAPI,'/allorders/<int:sid>')

if __name__ == '__main__':
    app.run(debug=True)