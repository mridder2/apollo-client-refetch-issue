import React from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// QUERIES
const TEST = gql`
  query TestOperation {
    test {
      number
      returnsError
    }
  }
`;

const UPDATE_TEST = gql`
  mutation {
    updateTest {
      number
    }
  }
`;

// COMPONENT
export default () => {
  const {
    loading: testLoading,
    error: testError,
    data: testData
  } = useQuery(TEST, { errorPolicy: "all" });

  const [
    mutation,
    { loading: mutationLoading, data: mutationData }
  ] = useMutation(UPDATE_TEST);

  const handleClick = () => {
    /*  - change test number to a new, random number
     *      and trigger a refetch for test data.
     */

    mutation({ refetchQueries: [{ query: TEST }] });
    // mutation({ refetchQueries: ["TestOperation"] });
  };

  return (
    <>
      {testLoading && <p>loading</p>}
      {!testLoading && <p>Query result: </p>}

      {testError && <p>error: graphQLError</p>}
      {testData && (
        <p>
          data: (number <strong>{testData.test.number}</strong>)
        </p>
      )}

      <button onClick={handleClick}>Set new number and refetch</button>

      {mutationLoading && <p>mutation loading</p>}
      {mutationData && (
        <p>
          new number should be:{" "}
          <strong>{mutationData.updateTest.number}</strong>
        </p>
      )}
    </>
  );
};
