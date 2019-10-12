import React from "react";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectShopItems } from "../../redux/shop/shop.selectors";
import { selectShopPreviewItems } from "../../redux/shop/shop.selectors";
import "./collection-overview.styles.scss";

const CollectionOverview = ({ collection }) => (
  <div className="collection-overview">
    {collection.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collection: selectShopPreviewItems
});

export default connect(mapStateToProps)(CollectionOverview);
