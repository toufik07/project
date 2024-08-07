from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime
import os

app = Flask(__name__)
api = Api(app)

# MongoDB connection
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGODB_URI)
db = client.get_database("woolmarket")
wool_products_collection = db.get_collection("wool_products")
orders_collection = db.get_collection("orders")

# Wool products endpoint
class WoolProducts(Resource):
    def get(self):
        products = list(wool_products_collection.find())
        for product in products:
            product['_id'] = str(product['_id'])  # Convert ObjectId to string
        return jsonify(products)

    def post(self):
        data = request.get_json()
        data['created_at'] = datetime.now()
        data['updated_at'] = datetime.now()
        result = wool_products_collection.insert_one(data)
        return {'message': 'Product added successfully', 'id': str(result.inserted_id)}, 201

class WoolProduct(Resource):
    def put(self, product_id):
        data = request.get_json()
        data['updated_at'] = datetime.now()
        result = wool_products_collection.update_one({'_id': ObjectId(product_id)}, {'$set': data})
        if result.modified_count > 0:
            return {'message': 'Product updated successfully'}, 200
        return {'error': 'Product not found'}, 404

    def delete(self, product_id):
        result = wool_products_collection.delete_one({'_id': ObjectId(product_id)})
        if result.deleted_count > 0:
            return {'message': 'Product deleted successfully'}, 200
        return {'error': 'Product not found'}, 404
    
    def get(self, product_id):
        product = wool_products_collection.find_one({'_id': ObjectId(product_id)})
        if product:
            product['_id'] = str(product['_id'])  # Convert ObjectId to string
            return jsonify(product)
        return {'error': 'Product not found'}, 404

class Orders(Resource):
    def get(self):
        orders = list(orders_collection.find())
        for order in orders:
            order['_id'] = str(order['_id'])  # Convert ObjectId to string
        return jsonify(orders)

    def post(self):
        data = request.get_json()
        data['created_at'] = datetime.now()
        data['updated_at'] = datetime.now()
        result = orders_collection.insert_one(data)
        return {'message': 'Order added successfully', 'id': str(result.inserted_id)}, 201

class Order(Resource):
    def get(self, order_id):
        order = orders_collection.find_one({'_id': ObjectId(order_id)})
        if order:
            order['_id'] = str(order['_id'])  # Convert ObjectId to string
            return jsonify(order)
        return {'error': 'Order not found'}, 404

    def put(self, order_id):
        data = request.get_json()
        data['updated_at'] = datetime.now()
        result = orders_collection.update_one({'_id': ObjectId(order_id)}, {'$set': data})
        if result.modified_count > 0:
            return {'message': 'Order updated successfully'}, 200
        return {'error': 'Order not found'}, 404

    def delete(self, order_id):
        result = orders_collection.delete_one({'_id': ObjectId(order_id)})
        if result.deleted_count > 0:
            return {'message': 'Order deleted successfully'}, 200
        return {'error': 'Order not found'}, 404

api.add_resource(Orders, '/orders')
api.add_resource(Order, '/orders/<string:order_id>')
api.add_resource(WoolProducts, '/products')
api.add_resource(WoolProduct,'/products/<string:product_id>')

if __name__ == '__main__':
    app.run(debug=True)

