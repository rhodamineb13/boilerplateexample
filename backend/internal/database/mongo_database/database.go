package mongoDatabase

import "go.mongodb.org/mongo-driver/v2/mongo"

var Client *mongo.Client

// MongoClient is a struct that holds the MongoDB client and database.
func Connect() {
	var err error
	Client, err = mongo.Connect(nil, nil) // Replace nil with actual context and options
	if err != nil {
		panic(err)
	}
}