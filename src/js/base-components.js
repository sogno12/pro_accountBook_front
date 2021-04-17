import Vue from "vue";

/**
 * lodash 라이브라리
 */
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

/**
 * Base component 전역 로딩
 */

// 모든 Base component 조회
const requireComponents = require.context("@/components/base", true, /\.vue$/);

requireComponents.keys().forEach((fileName) => {
  const component = requireComponents(fileName);
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\//, "").replace(/\.\w+$/, ""))
  );

  // 전역등록 vue.component(컴포넌트명, 컴포넌트);
 Vue.component(`${componentName}`, component.default || component);
});
