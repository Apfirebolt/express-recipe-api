from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

def connect_to_mongodb(host='localhost', port=27017, db_name='express-recipe'):
    """
    Connects to a MongoDB instance and returns the database object.
    """
    try:
        # Establish a connection to MongoDB
        client = MongoClient(host, port)

        print(f"Successfully connected to MongoDB at {host}:{port}!")

        # Access a database (it will be created if it doesn't exist)
        db = client[db_name]
        print(f"Connected to database: {db_name}")
        return db

    except ConnectionFailure as e:
        print(f"Could not connect to MongoDB: {e}")
        return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None


def get_all_users(db):
    """
    Fetch all the user documents
    """
    # Access the collection
    collection = db['users']

    # Fetch all documents
    documents = collection.find()

    # Print each document
    print("\n--- Documents in 'users' collection ---")
    for doc in documents:
        print(doc)
    print("--- End of documents ---")


def main():
    # Connect to MongoDB
    db = connect_to_mongodb()

    if db is not None:
        # Access the collection
        collection = db['recipes']

        # Fetch all documents
        documents = collection.find()

        # Print each document
        print("\n--- Documents in 'recipes' collection ---")
        for doc in documents:
            print(doc)
        print("--- End of documents ---")

    else:
        print("Database connection failed, cannot proceed with operations.")

    # Fetch all users
    if db is not None:
        get_all_users(db)
    else:
        print("Database connection failed, cannot proceed with operations.")


if __name__ == "__main__":
    main()