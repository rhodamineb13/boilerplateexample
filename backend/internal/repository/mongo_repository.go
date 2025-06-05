package repository

import (
	"context"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"godocker/internal/models/entities"
)
type mongoRepository[T entities.Entity] struct {
	collection *mongo.Collection
}
func (mr *mongoRepository[T]) Create(ctx context.Context, entity T) error {			
	_, err := mr.collection.InsertOne(ctx, entity)
	return err
}
func (mr *mongoRepository[T]) Update(ctx context.Context, entity T) error {
	filter := bson.M{"_id": entity.GetID()}
	update := bson.M{"$set": entity}
	_, err := mr.collection.UpdateOne(ctx, filter, update)
	return err
}
func (mr *mongoRepository[T]) Delete(ctx context.Context, id string) error {
	filter := bson.M{"_id": id}
	_, err := mr.collection.DeleteOne(ctx, filter)
	return err
}
func (mr *mongoRepository[T]) Get(ctx context.Context, page, pageSize uint) ([]T, error) {		
	skip := (page - 1) * pageSize
	opts := options.Find().SetSkip(int64(skip)).SetLimit(int64(pageSize))
	cursor, err := mr.collection.Find(ctx, bson.M{}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var entities []T
	if err = cursor.All(ctx, &entities); err != nil {
		return nil, err
	}
	return entities, nil
}
func (mr *mongoRepository[T]) GetByID(ctx context.Context, id string) (*T, error) {
	filter := bson.M{"_id": id}
	var entity T
	err := mr.collection.FindOne(ctx, filter).Decode(&entity)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil // No document found
		}
		return nil, err // Other error
	}
	return &entity, nil
}
func (mr *mongoRepository[T]) Driver() Driver {
	return MongoDB
}
func NewMongoRepository[T entities.Entity](client *mongo.Client, dbName, collectionName string) BaseRepository[T] {
	collection := client.Database(dbName).Collection(collectionName)
	return &mongoRepository[T]{collection: collection}
}