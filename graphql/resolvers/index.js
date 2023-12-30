import adminResolver from './admins.js';
import userResolver from './users.js';
import { DateTimeResolver } from 'graphql-scalars';

export default{
    DateTime: DateTimeResolver,

   
    Query: {
        ...adminResolver.Query,
        ...userResolver.Query,
    },
    Mutation:{
        ...adminResolver.Mutation,
        ...userResolver.Mutation,
    }
}
