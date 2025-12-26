import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { awsConfigs } from '../../aws-exports';

const httpLink = new HttpLink({
  uri: awsConfigs.aws_appsync_graphqlEndpoint,
  headers: {
    'x-api-key': awsConfigs.aws_appsync_apiKey,
  },
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default apolloClient;
