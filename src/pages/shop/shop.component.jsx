import React from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";
import {
  firestore,
  collectionsSnapShotToMap
} from "../../firebase/firebase.utils";

import { connect } from "react-redux";
import { updateCollection } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapShot = null;
  componentDidMount() {
    const { updateCollection } = this.props;
    const collectionsRef = firestore.collection("collections");

    collectionsRef.get().then(snapShot => {
      updateCollection(collectionsSnapShotToMap(snapShot.docs));
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        {/* <Route exact path={`${match.path}`} component={CollectionOverview} /> */}
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            console.log(props);
            return (
              <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
            );
          }}
        />
        {/* <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        /> */}

        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionsPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollection: collectionData => dispatch(updateCollection(collectionData))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
