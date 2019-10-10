import React from "react";
import { ReactComponent as ShoppingCart } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";
const CartIcon = ({ toggleCartHidden, totalQuantity }) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingCart className="shopping-icon" />
      <span className="item-count">{totalQuantity}</span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
  totalQuantity: selectCartItemsCount
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
