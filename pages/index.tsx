import * as React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import fetch from "node-fetch";
import ApolloClient from "apollo-client";
import { Frontier } from "frontier-forms";
import { myApplicationKit } from "../src/uiKit";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const IndexPage: NextPage = () => {
  const client = new ApolloClient({
    link: createHttpLink({
      // read-only endpoint
      uri: "https://api.eventlama.com/gql",
      fetch: fetch as any
    }),
    cache: new InMemoryCache()
  });
  const mutation = gql`
    mutation($token: String!, $id: Int!, $cfpRules: String) {
      updateEvent(token: $token, id: $id, cfpRules: $cfpRules) {
        id
        cfpRules
      }
    }
  `;
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
     <Frontier
      formats={{ email: "email" }}
      client={client}
      mutation={mutation}
      uiKit={myApplicationKit}
    >
      {({ kit, modifiers }) => (
        <form onSubmit={modifiers.save}>
          <p>{kit.cfpRules()}</p>
        </form>
      )}
    </Frontier>
    </Layout>
  )
}

export default IndexPage
