import React, { useEffect, useState } from "react";
import store from "../../store/data";
import _ from "lodash";
import "./Product.css";
function ProductList() {
  const [productList, setproductList] = useState([]);
  const [FilterList, SetFilterList] = useState([]);
  useEffect((el) => {
    setTimeout((el) => {
      setproductList(store.data.products);
    }, 1000);
    // productList
  }, []);

  //soring
  const handlesortChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      const myOrderedArray = _.sortBy(productList, (o) => parseInt(o.productData.price));
      setproductList(myOrderedArray);
    } else {
      const myOrderedArray = _.sortBy(productList, (o) => -parseInt(o.productData.price));
      setproductList(myOrderedArray);
    }
  };

  //handle filter  check
  const handleCheck = (e) => {
    const { name, value, checked } = e.target;
    let formObj = [];
    if (checked) {
      // push selected value in list
      formObj = [...FilterList, value];
    } else {
      // remove unchecked value from the list
      formObj = FilterList.filter((x) => {
        return x !== value;
      });
    }
    SetFilterList(formObj);
  };
  //filtering 10k,20k,30k
  useEffect(() => {
    let p = [...productList];
    let arr = p
      .filter((el, i) => {
        if (FilterList.indexOf("10k") !== -1) {
          if (parseInt(el.productData.price) <= 10000) {
            return el;
          }
        } else {
          return el;
        }
      })
      .filter((el) => {
        if (FilterList.indexOf("20k") !== -1) {
          if (parseInt(el.productData.price) <= 20000) {
            return el;
          }
        } else {
          return el;
        }
      })
      .filter((el) => {
        if (FilterList.indexOf("30k") !== -1) {
          if (parseInt(el.productData.price) <= 10000) {
            return el;
          }
        } else {
          return el;
        }
      });
    if (FilterList.length) {
      setproductList(arr);
    } else {
      setTimeout((el) => {
        setproductList(store.data.products);
      }, 1000);
    }
  }, [FilterList]);
  return (
    <React.Fragment>
      <div className="ProductList__header">
        <p className="ProductList__title">Melorra</p>
        <div className="ProductList__sort">
          <label htmlFor="sorting">Sort By Price </label>
          <input className="sort" id="sorting" type="checkbox" onChange={handlesortChange} />
        </div>
        <div className="ProductList__sort">
          <div>
            <label htmlFor="sorting">10k</label>
            <input className="sort" value="10k" id="sorting" name="price" type="checkbox" onChange={handleCheck} />
          </div>
          <div>
            <label htmlFor="sorting">20k</label>
            <input className="sort" value="20k" id="sorting" name="price" type="checkbox" onChange={handleCheck} />
          </div>
          <div>
            <label htmlFor="sorting">30k</label>
            <input className="sort" id="sorting" value="30k" name="price" type="checkbox" onChange={handleCheck} />
          </div>
        </div>
      </div>
      {!productList.length ? (
        <div style={{ textAlign: "center" }}>Please Wait...</div>
      ) : (
        <div className="ProductList__card">
          {productList.map((el) => {
            return (
              <div key={el.productData.sku + el.productData.price} className="ProductList__card-body">
                <div className="ProductList__img">
                  <img height="100px" width="100px" src={el.images[0]} />
                </div>
                <ul className="ProductList__ul">
                  <li>
                    <p className="">{el.productData.setName}</p>
                  </li>
                  <li>
                    <p className="">
                      <span className="ProductList__distprice">₹ {parseInt(el.productData.price)}</span>
                      <span className="ProductList__splprice ">₹ {parseInt(el.productData.specialPrice)} </span>
                    </p>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default ProductList;
