import * as React from "react";

import { UIKit, UIKITFieldProps, UIKitAPI } from "frontier-forms";

const translations : any = {
  "signin.email": "Email",
  "signin.password": "Password"
};

const FieldWrapper: React.SFC<
  UIKITFieldProps & { path: string; type: string; required: boolean }
> = props => {
  let path = props.path
    .split(".")
    .slice(-1)
    .pop();
  path = path.charAt(0).toUpperCase() + path.slice(1);
  return (
    <p>
      {props.type == "object" ? (
        props.children
      ) : (
        <form noValidate>
          <label htmlFor="">
            {translations[props.path] ? translations[props.path] : path}
          </label>
          {props.children}
          {!!props.error && (props.dirty || props.submitFailed) && (
            <span>
              {props.error == "required"
                ? "This field is required"
                : "There is an error"}
            </span>
          )}
        </form>
      )}
    </p>
  );
};


export const myApplicationKit: UIKitAPI = UIKit()
  .form((form, children) => (
    <form
      className={form.getState().submitting ? "ui form loading" : "ui form"}
      onSubmit={e => {
        e.preventDefault();
        form.submit();
      }}
    >
      <div>{children}</div>
      <br />
      <p>
        <input type="submit" value="Save" className="ui button" />
      </p>
    </form>
  ))
  .type("string", (path, required) => {
    return props => (
      <FieldWrapper required={required} type={"string"} path={path} {...props}>
        <input
          type={translations[path] === "Password" ? "password" : "text"}
        />
      </FieldWrapper>
    );
  });
