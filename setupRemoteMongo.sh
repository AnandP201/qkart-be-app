# Setup file template to upload data to MongoDB Atlas
mongoimport --uri 'mongodb+srv://anandpai:anandp2001@cluster0.lpgkn0o.mongodb.net/qkart?retryWrites=true&w=majority' --drop --collection users --file data/export_qkart_users.json
mongoimport --uri 'mongodb+srv://anandpai:anandp2001@cluster0.lpgkn0o.mongodb.net/qkart?retryWrites=true&w=majority' --drop --collection products --file data/export_qkart_products.json
