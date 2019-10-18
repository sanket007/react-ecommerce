import React from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { Route } from "react-router-dom";

import {
  selectIsLoading,
  selectIsCollectionsAreLoaded
} from "../../redux/shop/shop.selectors";

import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { createStructuredSelector } from "reselect";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match, isLoading, collectionsLoaded } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => {
            return (
              <CollectionsOverviewWithSpinner
                isLoading={isLoading}
                {...props}
              />
            );
          }}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionsPageWithSpinner
              isLoading={!collectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
  collectionsLoaded: selectIsCollectionsAreLoaded
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopPage);
