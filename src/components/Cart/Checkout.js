import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim() === 5;

const Checkout = (props) => {
  const [formInputsvalidity, setfromInputsvalidity] = useState({
    name: true,
    city: true,
    postalCode: true,
    Street: true,
  });
  const nameInputref = useRef();
  const streetInputref = useRef();
  const postalCodeInputref = useRef();
  const cityinputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredname = nameInputref.current.value;
    const enteredStreet = streetInputref.current.value;
    const enteredpostalcode = postalCodeInputref.current.value;
    const enteredcity = cityinputRef.current.value;

    const enteredNameisValid = !isEmpty(enteredname);
    const enteredStreetisValid = !isEmpty(enteredStreet);
    const enteredCityisValid = !isEmpty(enteredcity);
    const enteredPostalCodeisValid = isFiveChars(enteredpostalcode);

    setfromInputsvalidity({
      name: enteredCityisValid,
      city: enteredCityisValid,
      postalCode: enteredPostalCodeisValid,
      Street: enteredStreetisValid,
    });

    const formisValid =
      enteredCityisValid &&
      enteredNameisValid &&
      enteredPostalCodeisValid &&
      enteredStreetisValid;

    if (!formisValid) {
    }

    props.onConfirm({
      name: enteredname,
      city: enteredcity,
      postalCode: enteredpostalcode,
      street: enteredStreet,
    });
  };
  const namecontrolclasses = `${classes.control} ${
    formInputsvalidity.name ? "" : classes.invalid
  }`;
  const streetcontrolclasses = `${classes.control} ${
    formInputsvalidity.Street ? "" : classes.invalid
  }`;
  const Citycontrolclasses = `${classes.control} ${
    formInputsvalidity.city ? "" : classes.invalid
  }`;
  const postalCodecontrolclasses = `${classes.control} ${
    formInputsvalidity.postalCode ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={namecontrolclasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputref} />
        {!formInputsvalidity.name && <p>Enter a Valid Name</p>}
      </div>
      <div className={streetcontrolclasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputref} />
        {!formInputsvalidity.Street && <p>Enter a Valid Street Name</p>}
      </div>
      <div className={postalCodecontrolclasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputref} />
        {!formInputsvalidity.postalCode && (
          <p>Enter a Valid postal Code(5 characters long)</p>
        )}
      </div>
      <div className={Citycontrolclasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityinputRef} />
        {!formInputsvalidity.city && <p>Enter a Valid City Name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
