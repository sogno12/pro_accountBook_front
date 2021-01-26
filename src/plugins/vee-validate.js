import {
  alpha,
  alpha_dash,
  alpha_num,
  alpha_spaces,
  between,
  confirmed,
  digits,
  dimensions,
  email,
  excluded,
  ext,
  image,
  integer,
  is,
  is_not,
  length,
  max,
  max_value,
  mimes,
  min,
  min_value,
  numeric,
  oneOf,
  regex,
  required,
  required_if,
  size,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";
// import { extend, configure } from "vee-validate";
// import i18n from "@/i18n";

// configure({
//   // this will be used to generate messages.
//   defaultMessage: (field, values) => {
//     // values._field_ = i18n.t(field);
//     return i18n.t(`common.valid.${values._rule_}`, values);
//   },
// });

/**
 *  https://logaretm.github.io/vee-validate/guide/rules.html#rules 참조
 * 메시지는 {_field_}는 validatorProvider의 name속성 명
 * 각 validation의 파라메터는 사이트 참조
 * 표시 메시지 정보는 로케이션 파일에 정의
 */

extend("alpha", alpha);
extend("alpha_dash", alpha_dash);
extend("alpha_num", alpha_num);
extend("alpha_spaces", alpha_spaces);
extend("between", between);
extend("confirmed", confirmed);
extend("digits", digits);
extend("dimensions", dimensions);
extend("email", email);
extend("excluded", excluded);
extend("ext", ext);
extend("image", image);
extend("integer", integer);
extend("is", is);
extend("is_not", is_not);
extend("length", length);
extend("max", max);
extend("max_value", max_value);
extend("mimes", mimes);
extend("min", min);
extend("min_value", min_value);
extend("numeric", numeric);
extend("oneOf", oneOf);
extend("regex", regex);
extend("required", required);
extend("required_if", required_if);
extend("size", size);
extend("korAlphaNum", {
  validate: (value) => {
    if (!/^[가-힣|aA-zZ|0-9]*$/.test(value)) {
      return "한글, 영문, 숫자만 입력해주세요.";
    } else {
      return true;
    }
  },
});

// SAMPLE 커스텀 validation
// extend('maxLength', {
//   validate: (value, args) => {
//     return value.length > args.length;
//   },
//   params: ['length'],
//   message: '{length} 자리 이상 입력하시오!!!!'
// });
