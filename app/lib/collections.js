import { Mongo } from 'meteor/mongo';

users = new Mongo.Collection('users');
requests = new Mongo.Collection('requests')
messages = new Mongo.Collection('messages');
messageMap = new Mongo.Collection('messageMap');