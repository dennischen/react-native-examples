//before import realm
//to fix BSON: For React Native please polyfill crypto.getRandomValues
import 'react-native-get-random-values'

import Realm, { BSON, ObjectSchema } from 'realm'

export class Task extends Realm.Object {
    _id!: BSON.ObjectId
    description!: string
    isComplete!: boolean
    createdAt!: Date

    static generate(description: string) {
        return {
            _id: new BSON.ObjectId(),
            description,
            createdAt: new Date(),
        }
    }

    static schema: ObjectSchema = {
        name: 'Task',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            description: { type: 'string', indexed: 'full-text' },
            isComplete: { type: 'bool', default: false },
            createdAt: 'date'
        },
    };
}

export default Task