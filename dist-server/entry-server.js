import { jsx, jsxs } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import * as React from "react";
import React__default, { Component, useState, useEffect, useMemo } from "react";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useQuery, QueryClientProvider, QueryClient, dehydrate } from "@tanstack/react-query";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X, Menu, MapPin, Smartphone, Layers, Rocket, ArrowDown, Code2, Sparkles, ExternalLink, Github, Calendar, Clock, ArrowRight, Loader2, Store, Code, RefreshCw, Send, Instagram, Youtube, Twitter, Linkedin, MessageCircle, Mail, MessageSquare, FileText, ChevronDown, ArrowLeft, Tag, Check } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";
import { Toaster as Toaster$2 } from "sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { useLocation, useNavigate, Link, useParams, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import GhostContentAPI from "@tryghost/content-api";
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React__default.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React__default.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React__default.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React__default.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name) => child.type === name),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React__default.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data = helmetData;
      helmetData = new HelmetData(data.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React__default.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React__default.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1e6;
let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
const toastTimeouts = /* @__PURE__ */ new Map();
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => t.id === action.toast.id ? { ...t, ...action.toast } : t)
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
const listeners = [];
let memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(ToastPrimitives.Root, { ref, className: cn(toastVariants({ variant }), className), ...props });
});
Toast.displayName = ToastPrimitives.Root.displayName;
const ToastAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
const ToastClose = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
const ToastTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Title, { ref, className: cn("text-sm font-semibold", className), ...props }));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
const ToastDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(ToastPrimitives.Description, { ref, className: cn("text-sm opacity-90", className), ...props }));
ToastDescription.displayName = ToastPrimitives.Description.displayName;
function Toaster$1() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx(ToastViewport, {})
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$2,
    {
      theme,
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logo = "/assets/logo-D62VMSBd.webp";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);
  const navLinks = [
    { href: "#services", label: "Servicios" },
    { href: "#projects", label: "Proyectos" },
    { href: "#process", label: "Cómo trabajo" },
    { href: "#about", label: "Sobre mí" },
    { href: "#blog", label: "Blog" },
    { href: "#faq", label: "FAQ" }
  ];
  const handleClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === "/") {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    } else {
      navigate(`/${href}`);
    }
  };
  return /* @__PURE__ */ jsxs(
    "nav",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-16", children: [
          /* @__PURE__ */ jsx(
            motion.a,
            {
              href: "#home",
              className: "flex items-center transition-transform hover:scale-105",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.5 },
              onClick: (e) => handleClick(e, "#home"),
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: logo,
                  alt: "JadrDev Logo",
                  width: 360,
                  height: 208,
                  className: "h-14 w-auto sm:h-16 md:h-20"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center space-x-1", children: [
            navLinks.map((link, index) => /* @__PURE__ */ jsx(
              motion.a,
              {
                href: link.href,
                className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50",
                initial: { opacity: 0, y: -10 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3, delay: index * 0.05 },
                onClick: (e) => handleClick(e, link.href),
                children: link.label
              },
              link.href
            )),
            /* @__PURE__ */ jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                className: "ml-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold",
                children: /* @__PURE__ */ jsx("a", { href: "#contact", onClick: (e) => handleClick(e, "#contact"), children: "Pide presupuesto" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
            Button,
            {
              "aria-label": isOpen ? "Cerrar menú" : "Abrir menú",
              variant: "ghost",
              size: "sm",
              onClick: () => setIsOpen(!isOpen),
              className: "text-foreground",
              children: isOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
            }
          ) })
        ] }) }),
        isOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            className: "md:hidden bg-background/95 backdrop-blur-md border-b border-border",
            children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4 space-y-2", children: [
              navLinks.map((link) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  className: "block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors",
                  onClick: (e) => handleClick(e, link.href),
                  children: link.label
                },
                link.href
              )),
              /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold", children: /* @__PURE__ */ jsx("a", { href: "#contact", onClick: (e) => handleClick(e, "#contact"), children: "Pide presupuesto" }) })
            ] })
          }
        )
      ]
    }
  );
};
const heroImage = "/assets/hero-image-CjbRpK3E.webp";
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const Hero = () => {
  const highlights = [
    { icon: Smartphone, text: "6 apps publicadas en App Store y Google Play" },
    { icon: Layers, text: "iOS, Android y Web con un solo código" },
    { icon: Rocket, text: "De la idea a la publicación en las tiendas" }
  ];
  const apps = ["Jable", "iHerro", "Talega", "PROSA", "Krondoc", "Tejineando"];
  return /* @__PURE__ */ jsxs("section", { id: "home", className: "relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-gradient-hero", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 opacity-20",
          style: {
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-background/40" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        motion.p,
        {
          className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm sm:text-base text-foreground",
          initial: { opacity: 0, y: -10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4 text-primary shrink-0" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Hola, soy ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-primary", children: "JadrDev" }),
              " · Desarrollador en Canarias"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight", children: [
        "Apps móviles y webs que tus clientes",
        " ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "usan de verdad" })
      ] }),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          className: "text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.2 },
          children: "Diseño y desarrollo apps para iOS y Android y webs a medida para comercios, asociaciones y empresas de Canarias y toda España."
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "flex flex-col sm:flex-row gap-4 justify-center items-center pt-4",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.3 },
          children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                className: "w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold text-lg px-8 py-6",
                onClick: () => scrollTo("contact"),
                children: "Pide presupuesto"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "w-full sm:w-auto border-primary text-primary hover:bg-primary/10 font-semibold text-lg px-8 py-6",
                onClick: () => scrollTo("projects"),
                children: "Ver proyectos"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "pt-10 space-y-6",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay: 0.5 },
          children: [
            /* @__PURE__ */ jsx("ul", { className: "flex flex-col md:flex-row justify-center gap-3 md:gap-8 text-sm sm:text-base text-foreground/90", children: highlights.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(item.icon, { className: "w-5 h-5 text-primary shrink-0" }),
              item.text
            ] }, item.text)) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-3", children: "Apps en las que he trabajado" }),
              /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap justify-center gap-x-6 gap-y-2 text-lg font-semibold text-foreground/60", children: apps.map((app) => /* @__PURE__ */ jsx("li", { children: app }, app)) })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        className: "absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, delay: 1 },
        children: /* @__PURE__ */ jsx(
          motion.button,
          {
            animate: { y: [0, 10, 0] },
            transition: { duration: 1.5, repeat: Infinity },
            onClick: () => scrollTo("services"),
            "aria-label": "Ver servicios",
            children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-6 h-6 text-primary" })
          }
        )
      }
    )
  ] });
};
const techs = [
  { name: "Angular", color: "text-tech-red" },
  { name: "Ionic", color: "text-tech-blue" },
  { name: "Flutter", color: "text-tech-cyan" },
  { name: "Capacitor", color: "text-tech-blue" },
  { name: "React", color: "text-tech-cyan" },
  { name: "React Native", color: "text-tech-cyan" },
  { name: "PixiJS", color: "text-tech-pink" },
  { name: "Godot", color: "text-tech-teal" },
  { name: "Swift", color: "text-tech-red" },
  { name: "Laravel", color: "text-tech-red" },
  { name: "TypeScript", color: "text-tech-blue" },
  { name: "Dart", color: "text-tech-teal" },
  { name: "Content Management System", color: "text-tech-yellow" },
  { name: "SEO", color: "text-tech-yellow" }
];
const About = () => {
  const features = [
    {
      icon: Code2,
      title: "Frontend Development",
      description: "Especializado en Angular, TypeScript y construcción de interfaces modernas, rápidas y escalables."
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Experiencia en Ionic, Flutter y Capacitor para crear apps multiplataforma listas para iOS, Android y Web."
    },
    {
      icon: Sparkles,
      title: "Experiencias Digitales",
      description: "Enfoque en diseño limpio, rendimiento y fluidez para ofrecer productos centrados en el usuario."
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "about", className: "py-20 sm:py-32", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "max-w-4xl mx-auto text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
            "Sobre ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "mí" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-lg sm:text-xl text-muted-foreground leading-relaxed", children: [
            "Soy ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-primary", children: "JadrDev" }),
            ", desarrollador frontend y mobile con enfoque en crear aplicaciones modernas y orientadas al detalle. Trabajo con tecnologías como",
            /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: " Angular" }),
            ",",
            /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: " Ionic" }),
            ",",
            /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: " Flutter" }),
            " y",
            /* @__PURE__ */ jsx("span", { className: "text-primary font-semibold", children: " Capacitor" }),
            " para transformar ideas en productos digitales reales."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground leading-relaxed mt-4", children: "Me apasiona construir interfaces sólidas y usables, combinando buen diseño, rendimiento y una arquitectura limpia. Mi objetivo es entregar experiencias que se sientan intuitivas, rápidas y profesionales." })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: index * 0.1 },
        viewport: { once: true },
        className: "bg-card border border-border rounded-xl p-6 hover-lift",
        children: [
          /* @__PURE__ */ jsx(feature.icon, { className: "w-12 h-12 text-primary mb-4" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature.description })
        ]
      },
      feature.title
    )) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        viewport: { once: true },
        className: "max-w-4xl mx-auto mt-16 text-center",
        children: [
          /* @__PURE__ */ jsx("h3", { id: "technologies", className: "text-2xl font-semibold mb-6", children: "Tecnologías que uso" }),
          /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap justify-center gap-3", children: techs.map((tech) => /* @__PURE__ */ jsx(
            "li",
            {
              className: "px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors",
              children: /* @__PURE__ */ jsx("span", { className: `font-semibold ${tech.color}`, children: tech.name })
            },
            tech.name
          )) })
        ]
      }
    )
  ] }) });
};
const AppleIcon = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { d: "M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" }),
      /* @__PURE__ */ jsx("path", { d: "M10 2c1 .5 2 2 2 5" })
    ]
  }
);
const ProjectCard = ({ project, index }) => {
  const links = [
    { href: project.link, title: "Ver web", icon: ExternalLink },
    { href: project.iosLink, title: "App Store", icon: AppleIcon },
    { href: project.androidLink, title: "Google Play", icon: Smartphone },
    { href: project.github, title: "Código fuente", icon: Github }
  ].filter((link) => link.href);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
      viewport: { once: true },
      className: "bg-card border border-border rounded-xl p-6 hover-lift group",
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: project.icon,
              alt: `Icono de la app ${project.title}`,
              width: 64,
              height: 64,
              loading: "lazy",
              className: "h-16 w-16 rounded-2xl shadow-md ring-1 ring-border object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: links.map((link) => /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              className: "h-8 w-8 p-0 hover:text-primary",
              asChild: true,
              children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  title: link.title,
                  "aria-label": `${link.title}: ${project.title}`,
                  children: /* @__PURE__ */ jsx(link.icon, { className: "h-4 w-4" })
                }
              )
            },
            link.title
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold group-hover:text-primary transition-colors", children: project.title }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-primary", children: project.role })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: project.description }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full",
            children: tag
          },
          tag
        )) })
      ] })
    }
  );
};
const jableIcon = "/assets/jable-NVxvgg1d.webp";
const iherroIcon = "/assets/iherro-CywtueUR.webp";
const talegaIcon = "/assets/talega-Cx4EQoHm.webp";
const prosaIcon = "/assets/prosa-DdDSRpxV.webp";
const krondocIcon = "/assets/krondoc-CIZYnT5i.webp";
const tejineandoIcon = "/assets/tejineando-CpyBzjIg.webp";
const gasolinerasIcon = "/assets/gasolineras-canarias-B1OT4C8l.webp";
const pautaIcon = "/assets/pauta-D0Aa73DQ.webp";
const projects = [
  {
    title: "Jable Card - ACEA Lanzarote",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios"],
    icon: jableIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "App móvil de fidelización para asociación de comerciantes de Lanzarote. Sistema de puntos, ofertas y gestión de comercios.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://acealanzarote.com/jable-card/",
    iosLink: "https://apps.apple.com/es/app/jable/id6744336880",
    androidLink: "https://play.google.com/store/apps/details?id=es.jable.user.app&pli=1"
  },
  {
    title: "iHerro - Fidelización",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios", "desarrollo-web-paneles"],
    icon: iherroIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Plataforma de fidelización completa con app móvil y panel de administración para asociaciones comerciales.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://iherro.com/",
    iosLink: "https://apps.apple.com/es/app/iherro/id6743393970?l=en-GB",
    androidLink: "https://play.google.com/store/apps/details?id=es.iherro.user.app&pli=1"
  },
  {
    title: "AppTalega",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios", "desarrollo-web-paneles"],
    icon: talegaIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Sistema de fidelización y gestión de comercios con aplicación móvil multiplataforma y dashboard de administración.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://apptalega.com/",
    iosLink: "https://apps.apple.com/us/app/talega/id6743695641?platform=iphone",
    androidLink: "https://play.google.com/store/apps/details?id=es.talega.user.app"
  },
  {
    title: "PROSA Puerto del Rosario",
    services: ["desarrollo-apps-moviles", "apps-fidelizacion-comercios"],
    icon: prosaIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "App de fidelización para la asociación de comerciantes de Puerto del Rosario, con gestión de ofertas y beneficios.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://prosapuertodelrosario.com/",
    iosLink: "https://apps.apple.com/us/app/prosa/id6743711087",
    androidLink: "https://play.google.com/store/apps/details?id=es.prosa.user.app&hl=es_419"
  },
  {
    title: "Krondoc",
    services: ["desarrollo-apps-moviles"],
    icon: krondocIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Aplicación de control de fichaje para gestionar el control horario y reportes.",
    tags: ["Ionic", "Angular", "TypeScript", "Capacitor"],
    link: "https://krondoc.com/",
    iosLink: "https://apps.apple.com/es/app/krondoc/id6741791280",
    androidLink: "https://play.google.com/store/apps/details?id=com.krondoc.app&hl=es_419"
  },
  {
    title: "Juego - Tejineando",
    services: ["desarrollo-apps-moviles", "migracion-mantenimiento-apps"],
    icon: tejineandoIcon,
    role: "Senior Frontend en Servicios Avanzados de Opinión",
    description: "Juego móvil para iOS y Android desarrollado en Godot 4 —migrado desde Ionic + PixiJS—, con sistemas de combate, coplas, preguntas y progresión, y funcionalidades nativas como la geolocalización.",
    tags: [
      "Godot 4",
      "GDScript",
      "Game Development",
      "Geolocalización"
    ],
    link: "https://tejineando.com/",
    iosLink: "https://apps.apple.com/es/app/tejineando/id6748699961?platform=iphone",
    androidLink: "https://play.google.com/store/apps/details?id=com.v1.tejineando.app&hl=es"
  },
  {
    title: "Gasolineras de Canarias",
    services: ["desarrollo-apps-moviles"],
    icon: gasolinerasIcon,
    role: "Proyecto Propio",
    description: "Aplicación móvil para localizar gasolineras en Canarias con precios actualizados y rutas optimizadas.",
    tags: ["Flutter", "Dart", "Google Maps API"],
    link: "https://jadrdev.github.io/gasolineras_can/",
    github: "https://github.com/jadrdev/gasolineras_can"
  },
  {
    title: "Pauta",
    services: ["desarrollo-apps-moviles"],
    icon: pautaIcon,
    role: "Proyecto Propio",
    description: "Gestor de tareas nativo en SwiftUI para macOS, con app de iOS, widgets y Apple Watch. Sin cuentas ni suscripciones: tus datos se sincronizan en tu propia carpeta de iCloud.",
    tags: ["Swift", "SwiftUI", "macOS", "iOS", "iCloud"],
    github: "https://github.com/jadrdev/pauta"
  }
];
const Projects = () => {
  return /* @__PURE__ */ jsx("section", { id: "projects", className: "py-20 sm:py-32", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
            "Proyectos ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "destacados" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Una selección de mis trabajos más recientes en desarrollo web y móvil" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: projects.map((project, index) => /* @__PURE__ */ jsx(ProjectCard, { project, index }, project.title)) })
  ] }) });
};
const ghost = new GhostContentAPI({
  url: "https://jadrdev.digitalpress.blog",
  key: "dba7d0fd06d3c0f72ef1266d2c",
  version: "v5.0"
});
const withoutHtml = (posts) => posts.map(({ html: _html, ...post }) => post);
const latestPostsQuery = {
  queryKey: ["ghost-posts"],
  queryFn: async () => withoutHtml(await ghost.posts.browse({ limit: 3, include: ["tags", "authors"] }))
};
const allPostsQuery = {
  queryKey: ["ghost-posts-all"],
  queryFn: async () => withoutHtml(await ghost.posts.browse({ limit: "all", include: ["tags", "authors"] }))
};
const postQuery = (slug) => ({
  queryKey: ["ghost-post", slug],
  queryFn: async () => await ghost.posts.read({ slug, include: ["tags", "authors"] })
});
const prefetchForPath = async (queryClient, pathname) => {
  if (pathname === "/") {
    await queryClient.prefetchQuery(latestPostsQuery);
  } else if (pathname === "/blog") {
    await queryClient.prefetchQuery(allPostsQuery);
  } else if (pathname.startsWith("/blog/")) {
    await queryClient.prefetchQuery(postQuery(pathname.slice("/blog/".length)));
  }
};
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props }));
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
const BlogCard = ({ post, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1 },
      viewport: { once: true },
      className: "h-full",
      children: /* @__PURE__ */ jsxs(Card, { className: "h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group", children: [
        /* @__PURE__ */ jsxs(Link, { to: `/blog/${post.slug}`, className: "block overflow-hidden h-48 relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" }),
          post.feature_image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: post.feature_image,
              alt: post.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Sin imagen" }) }),
          post.primary_tag && /* @__PURE__ */ jsx(Badge, { className: "absolute top-4 right-4 z-20 bg-primary/90 hover:bg-primary", children: post.primary_tag.name })
        ] }),
        /* @__PURE__ */ jsxs(CardHeader, { className: "space-y-2 pb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center text-xs text-muted-foreground space-x-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3 mr-1" }),
              formatDate(post.published_at)
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 mr-1" }),
              post.reading_time,
              " min de lectura"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, className: "group-hover:text-primary transition-colors", children: /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl line-clamp-2 leading-tight", children: post.title }) })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "flex-grow", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm line-clamp-3", children: post.custom_excerpt || post.excerpt }) }),
        /* @__PURE__ */ jsx(CardFooter, { className: "pt-0", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "p-0 h-auto font-medium text-primary hover:text-primary/80 hover:bg-transparent group/btn", asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: `/blog/${post.slug}`, className: "flex items-center", children: [
          "Leer artículo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" })
        ] }) }) })
      ] })
    }
  );
};
const Blog = () => {
  const { data: posts, isLoading, error } = useQuery(latestPostsQuery);
  if (error) {
    console.error("Error fetching blog posts:", error);
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { id: "blog", className: "py-20 sm:py-32 bg-muted/30 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 -left-64 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          viewport: { once: true },
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-4", children: "Últimos Artículos" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "Comparto mis conocimientos y experiencias sobre desarrollo web, tecnología y más en mi blog personal." })
          ]
        }
      ),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-primary" }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12", children: posts?.map((post, index) => /* @__PURE__ */ jsx(BlogCard, { post, index }, post.id)) }),
      /* @__PURE__ */ jsx("div", { className: "text-center mt-8", children: /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "rounded-full px-8", children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
        "Ver todos los artículos ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
      ] }) }) })
    ] })
  ] });
};
const services = [
  {
    slug: "desarrollo-apps-moviles",
    icon: Smartphone,
    title: "Apps móviles para iOS y Android",
    summary: "Desarrollo tu app multiplataforma con Ionic, Capacitor o Flutter: un solo código para iOS, Android y Web, lista para publicar en las tiendas.",
    seoTitle: "Desarrollo de apps móviles para iOS y Android en Canarias",
    seoDescription: "Desarrollo de apps móviles multiplataforma para iOS, Android y Web con Ionic, Capacitor y Flutter. Del diseño a la publicación en App Store y Google Play. Pide presupuesto.",
    heading: "Desarrollo de apps móviles para iOS y Android",
    intro: [
      "Convierto tu idea en una app real, publicada en App Store y Google Play. Trabajo con tecnologías multiplataforma como Ionic, Capacitor y Flutter, que permiten tener la app en iOS, Android y Web a partir de una única base de código.",
      "Eso significa menos coste de desarrollo, un mantenimiento más sencillo y la misma experiencia para todos tus usuarios, tengan el móvil que tengan."
    ],
    includes: [
      {
        title: "Diseño de la experiencia",
        description: "Pantallas claras y fáciles de usar, pensadas para que tus usuarios encuentren lo que buscan sin esfuerzo."
      },
      {
        title: "Desarrollo multiplataforma",
        description: "Una sola base de código para iOS, Android y Web con Ionic, Capacitor o Flutter."
      },
      {
        title: "Funcionalidades nativas",
        description: "Notificaciones push, geolocalización, cámara, lector de códigos QR o almacenamiento local cuando el proyecto lo necesita."
      },
      {
        title: "Conexión con tu sistema",
        description: "Integración con APIs, bases de datos y paneles de gestión para que la app trabaje con tus datos reales."
      },
      {
        title: "Publicación en las tiendas",
        description: "Preparo y publico la app en App Store y Google Play y te acompaño en el proceso de revisión."
      },
      {
        title: "Evolución y mantenimiento",
        description: "Actualizaciones, nuevas funcionalidades y adaptación a las nuevas versiones de iOS y Android."
      }
    ],
    audience: [
      "Empresas que quieren ofrecer sus servicios desde el móvil.",
      "Comercios y asociaciones que buscan fidelizar a sus clientes.",
      "Emprendedores con una idea que quieren validar con una app real."
    ],
    faqs: [
      {
        question: "¿Es mejor una app nativa o una multiplataforma?",
        answer: "Para la mayoría de proyectos una app multiplataforma es la opción más rentable: un solo código para iOS y Android con un rendimiento excelente. Si tu proyecto necesita algo muy específico de una plataforma, te lo diré en la propuesta."
      },
      {
        question: "¿La app funcionará también en la web?",
        answer: "Con Ionic y Capacitor la misma app puede publicarse también como aplicación web (PWA), sin desarrollar una versión aparte."
      }
    ]
  },
  {
    slug: "apps-fidelizacion-comercios",
    icon: Store,
    title: "Apps de fidelización para comercios",
    summary: "Tarjetas de puntos, ofertas y campañas para asociaciones de comerciantes y negocios locales, con app para clientes y panel de gestión.",
    seoTitle: "Apps de fidelización para comercios y asociaciones de comerciantes",
    seoDescription: "App de fidelización con tarjeta de puntos, ofertas y campañas para asociaciones de comerciantes y negocios locales en Canarias. Experiencia en apps como Jable, iHerro, Talega y PROSA.",
    heading: "Apps de fidelización para comercios y asociaciones",
    intro: [
      "He participado en el desarrollo de varias apps de fidelización para asociaciones de comerciantes de Canarias, como Jable en Lanzarote, iHerro en El Hierro, Talega o PROSA en Puerto del Rosario.",
      "Una app de fidelización ayuda a que los clientes vuelvan al comercio local: acumulan puntos con sus compras, reciben ofertas y descubren los negocios de su zona. Y la asociación tiene datos reales para medir sus campañas."
    ],
    includes: [
      {
        title: "Tarjeta de puntos digital",
        description: "Los clientes acumulan y canjean puntos en los comercios adheridos desde su móvil."
      },
      {
        title: "Ofertas y campañas",
        description: "Promociones, sorteos y campañas especiales que la asociación o cada comercio puede lanzar fácilmente."
      },
      {
        title: "Directorio de comercios",
        description: "Un escaparate de los negocios adheridos para que los clientes descubran el comercio de su zona."
      },
      {
        title: "Panel de gestión",
        description: "Un panel web para la asociación y los comercios: clientes, puntos, ofertas y estadísticas."
      },
      {
        title: "Notificaciones",
        description: "Avisos a los clientes sobre nuevas ofertas, campañas y novedades."
      },
      {
        title: "Apps en iOS, Android y Web",
        description: "Disponible en App Store, Google Play y como aplicación web para llegar a todos los clientes."
      }
    ],
    audience: [
      "Asociaciones de comerciantes y zonas comerciales abiertas.",
      "Ayuntamientos y entidades que quieren dinamizar el comercio local.",
      "Cadenas y negocios con clientes recurrentes."
    ],
    faqs: [
      {
        question: "¿Los comercios necesitan algún equipo especial?",
        answer: "Normalmente basta con un móvil o una tablet para registrar las compras o leer el código del cliente. Lo concretamos según cómo trabaje cada comercio."
      },
      {
        question: "¿Se puede adaptar a la imagen de mi asociación?",
        answer: "Sí. Cada app lleva el nombre, los colores y la identidad de la asociación o del comercio, y se publica en las tiendas con su propia marca."
      }
    ]
  },
  {
    slug: "desarrollo-web-paneles",
    icon: Code,
    title: "Webs y paneles de gestión",
    summary: "Webs a medida y paneles de administración rápidos y responsivos con Angular y TypeScript, conectados a tu app o a tus sistemas.",
    seoTitle: "Desarrollo web a medida y paneles de gestión con Angular",
    seoDescription: "Desarrollo de webs a medida y paneles de administración con Angular y TypeScript: rápidos, responsivos y conectados a tu app o a tus sistemas. Pide presupuesto.",
    heading: "Webs a medida y paneles de gestión",
    intro: [
      "Detrás de una buena app casi siempre hay un panel de gestión: el lugar desde donde tu equipo controla usuarios, contenidos, pedidos o estadísticas. Desarrollo esos paneles y también webs a medida para tu negocio.",
      "Trabajo con Angular y TypeScript para crear interfaces rápidas, fiables y fáciles de mantener, que se adaptan a cualquier pantalla."
    ],
    includes: [
      {
        title: "Paneles de administración",
        description: "Gestión de usuarios, contenidos, pedidos, puntos o reservas desde el navegador."
      },
      {
        title: "Webs a medida",
        description: "Webs rápidas y adaptadas al móvil, pensadas para que tus visitantes se conviertan en clientes."
      },
      {
        title: "Conexión con tu app",
        description: "El panel y la app comparten datos para que todo esté siempre sincronizado."
      },
      {
        title: "Informes y estadísticas",
        description: "Gráficas y datos para tomar decisiones con información real."
      },
      {
        title: "SEO técnico",
        description: "Estructura, velocidad y datos estructurados para que Google entienda y posicione tu web."
      },
      {
        title: "Rendimiento",
        description: "Interfaces optimizadas que cargan rápido y funcionan bien en cualquier dispositivo."
      }
    ],
    audience: [
      "Empresas que necesitan gestionar su app desde un panel web.",
      "Negocios que quieren una web profesional hecha a medida.",
      "Equipos que necesitan una herramienta interna adaptada a su forma de trabajar."
    ],
    faqs: [
      {
        question: "¿Puedo gestionar yo mismo los contenidos?",
        answer: "Sí. El panel se diseña para que tu equipo pueda gestionar el día a día sin conocimientos técnicos."
      },
      {
        question: "¿Puedes trabajar sobre una web o un panel que ya tengo?",
        answer: "Sí. Reviso el proyecto actual y te propongo si conviene mejorarlo o rehacerlo, con los pros y contras de cada opción."
      }
    ]
  },
  {
    slug: "migracion-mantenimiento-apps",
    icon: RefreshCw,
    title: "Migración, mantenimiento y consultoría",
    summary: "Modernizo apps existentes (de Ionic a Flutter, PixiJS legacy a PixiJS 8…) y te asesoro sobre arquitectura y la tecnología más adecuada.",
    seoTitle: "Migración y mantenimiento de apps: Ionic, Flutter y más",
    seoDescription: "Migración, actualización y mantenimiento de apps móviles: de Ionic a Flutter, actualización de Angular y Capacitor, y consultoría técnica sobre arquitectura y tecnología.",
    heading: "Migración, mantenimiento y consultoría de apps",
    intro: [
      "Las apps envejecen: las librerías se quedan obsoletas, las tiendas exigen nuevas versiones de iOS y Android y el código se vuelve difícil de mantener. Te ayudo a modernizar tu app sin empezar de cero cuando no hace falta.",
      "He trabajado en migraciones como el paso de juegos en Ionic + PixiJS a Godot 4 o la actualización de proyectos PixiJS legacy a PixiJS 8, y en la actualización de apps Ionic, Angular y Capacitor."
    ],
    includes: [
      {
        title: "Auditoría del proyecto",
        description: "Reviso el estado de tu app y te explico qué conviene actualizar, mejorar o rehacer."
      },
      {
        title: "Migración de tecnología",
        description: "De Ionic a Flutter, de PixiJS legacy a PixiJS 8 o a Godot, según lo que necesite tu proyecto."
      },
      {
        title: "Actualización de versiones",
        description: "Angular, Ionic, Capacitor y dependencias al día para cumplir los requisitos de las tiendas."
      },
      {
        title: "Mantenimiento continuo",
        description: "Corrección de errores, pequeñas mejoras y publicación de nuevas versiones."
      },
      {
        title: "Rendimiento",
        description: "Optimización de la carga, la fluidez y el consumo de la app."
      },
      {
        title: "Consultoría técnica",
        description: "Asesoramiento sobre arquitectura, elección de tecnologías y buenas prácticas para tu equipo."
      }
    ],
    audience: [
      "Empresas con una app que se ha quedado anticuada.",
      "Proyectos cuyo desarrollador anterior ya no está disponible.",
      "Equipos que necesitan una segunda opinión técnica antes de decidir."
    ],
    faqs: [
      {
        question: "¿Hay que rehacer la app desde cero?",
        answer: "No siempre. Muchas veces se puede actualizar por partes y conservar lo que funciona. Después de revisar el proyecto te propongo la opción con mejor relación entre coste y resultado."
      },
      {
        question: "Mi app la hizo otra persona, ¿puedes encargarte?",
        answer: "Sí. Reviso el código existente, documento lo necesario y me encargo de su mantenimiento y evolución."
      }
    ]
  }
];
const getService = (slug) => services.find((service) => service.slug === slug);
const Services = () => {
  return /* @__PURE__ */ jsx("section", { id: "services", className: "py-20 sm:py-32 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
            "¿En qué te puedo ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "ayudar" }),
            "?"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Servicios de desarrollo de apps móviles y webs para empresas, comercios y asociaciones" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto", children: services.map((service, index) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.5, delay: index * 0.1 },
        viewport: { once: true },
        children: /* @__PURE__ */ jsx(
          Link,
          {
            to: `/servicios/${service.slug}`,
            className: "block h-full bg-card border border-border rounded-xl p-8 hover-lift group hover:border-primary/50 transition-colors",
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsx(service.icon, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2 group-hover:text-primary transition-colors", children: service.title }),
                /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-4", children: service.summary }),
                /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center text-sm font-medium text-primary", children: [
                  "Más información",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" })
                ] })
              ] })
            ] })
          }
        )
      },
      service.slug
    )) })
  ] }) });
};
const WHATSAPP_NUMBER = "34611831797";
const WHATSAPP_DISPLAY = "+34 611 83 17 97";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, he visto tu web y me gustaría pedir presupuesto para un proyecto."
)}`;
const Tiktok = (props) => {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...props,
      children: /* @__PURE__ */ jsx("path", { d: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-9-9v12Z" })
    }
  );
};
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const projectTypes = [
  "App móvil (iOS y Android)",
  "App de fidelización para comercios",
  "Web o panel de gestión",
  "Mejorar o migrar una app existente",
  "Otro"
];
const budgets = [
  "Aún no lo sé",
  "Menos de 3.000 €",
  "3.000 € – 10.000 €",
  "Más de 10.000 €"
];
const selectClassName = "flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:border-primary";
const initialFormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: ""
};
const Contact = () => {
  const { toast: toast2 } = useToast();
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast2({
        title: "Error",
        description: "Por favor completa todos los campos",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const serviceId = "service_81c64r8";
      const templateId = "template_e44jqfr";
      const publicKey = "YnY8LBtLLyDw3tVSx";
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        project_type: formData.projectType,
        budget: formData.budget,
        // Also folded into the message so the existing EmailJS template shows it
        message: `Tipo de proyecto: ${formData.projectType || "-"}
Presupuesto: ${formData.budget || "-"}

${formData.message}`,
        to_name: "Jadrdev"
        // Tu nombre
      };
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      toast2({
        title: "¡Mensaje enviado!",
        description: "Te responderé lo antes posible."
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast2({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/jadrdevcm", label: "Instagram" },
    { icon: Tiktok, href: "https://www.tiktok.com/@jadrdevcm", label: "Tiktok" },
    { icon: Youtube, href: "https://www.youtube.com/@jadrdevcm", label: "Youtube" },
    { icon: Twitter, href: "https://twitter.com/jadrdevcm", label: "Twitter" },
    { icon: Github, href: "https://github.com/jadrdev", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/jadrdev", label: "LinkedIn" },
    { icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
    { icon: Mail, href: "mailto:info@jadrdev.com", label: "Email" }
  ];
  return /* @__PURE__ */ jsx("section", { id: "contact", className: "py-20 sm:py-32 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
            "Hablemos de tu ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "proyecto" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Cuéntame tu idea y te preparo una propuesta con presupuesto, sin compromiso" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        motion.form,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.2 },
          viewport: { once: true },
          onSubmit: handleSubmit,
          className: "bg-card border border-border rounded-xl p-8 space-y-6",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-2", children: "Nombre" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "name",
                      type: "text",
                      placeholder: "Tu nombre",
                      value: formData.name,
                      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                      className: "bg-background border-border focus:border-primary"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-2", children: "Email" }),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "email",
                      type: "email",
                      placeholder: "tu@email.com",
                      value: formData.email,
                      onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                      className: "bg-background border-border focus:border-primary"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "projectType", className: "block text-sm font-medium mb-2", children: "¿Qué necesitas?" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "projectType",
                      value: formData.projectType,
                      onChange: (e) => setFormData({ ...formData, projectType: e.target.value }),
                      className: selectClassName,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una opción" }),
                        projectTypes.map((type) => /* @__PURE__ */ jsx("option", { value: type, children: type }, type))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { htmlFor: "budget", className: "block text-sm font-medium mb-2", children: "Presupuesto orientativo" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "budget",
                      value: formData.budget,
                      onChange: (e) => setFormData({ ...formData, budget: e.target.value }),
                      className: selectClassName,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "Selecciona una opción" }),
                        budgets.map((budget) => /* @__PURE__ */ jsx("option", { value: budget, children: budget }, budget))
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block text-sm font-medium mb-2", children: "Mensaje" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "message",
                    placeholder: "Cuéntame sobre tu proyecto...",
                    rows: 5,
                    value: formData.message,
                    onChange: (e) => setFormData({ ...formData, message: e.target.value }),
                    className: "bg-background border-border focus:border-primary resize-none"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "submit",
                size: "lg",
                disabled: isSubmitting,
                className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold",
                children: [
                  /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 mr-2" }),
                  isSubmitting ? "Enviando..." : "Pedir presupuesto"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
              "¿Prefieres hablar directamente? Escríbeme por",
              " ",
              /* @__PURE__ */ jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", className: "text-primary hover:underline", children: [
                "WhatsApp (",
                WHATSAPP_DISPLAY,
                ")"
              ] }),
              " ",
              "o a",
              " ",
              /* @__PURE__ */ jsx("a", { href: "mailto:info@jadrdev.com", className: "text-primary hover:underline", children: "info@jadrdev.com" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          transition: { duration: 0.5, delay: 0.4 },
          viewport: { once: true },
          className: "flex flex-wrap justify-center gap-4 sm:gap-6 mt-12",
          children: socialLinks.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-3 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-all hover-lift",
              "aria-label": link.label,
              children: /* @__PURE__ */ jsx(link.icon, { className: "w-6 h-6" })
            },
            link.label
          ))
        }
      )
    ] })
  ] }) });
};
const Process = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Hablamos",
      description: "Me cuentas tu idea o el problema que quieres resolver. Sin compromiso y sin tecnicismos."
    },
    {
      icon: FileText,
      title: "Propuesta",
      description: "Te envío una propuesta con el alcance, las fases, los plazos y un presupuesto detallado."
    },
    {
      icon: Code2,
      title: "Diseño y desarrollo",
      description: "Trabajo por entregas para que veas avances reales y puedas opinar durante todo el proceso."
    },
    {
      icon: Rocket,
      title: "Publicación y soporte",
      description: "Publico la app en App Store y Google Play y te acompaño después del lanzamiento."
    }
  ];
  return /* @__PURE__ */ jsx("section", { id: "process", className: "py-20 sm:py-32 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
        className: "text-center mb-16",
        children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
            "Cómo ",
            /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "trabajo" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Un proceso claro para que sepas en todo momento en qué punto está tu proyecto" })
        ]
      }
    ),
    /* @__PURE__ */ jsx("ol", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto", children: steps.map((step, index) => /* @__PURE__ */ jsxs(
      motion.li,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: index * 0.1 },
        viewport: { once: true },
        className: "relative bg-card border border-border rounded-xl p-6",
        children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-4 right-5 text-4xl font-bold text-primary/20", children: index + 1 }),
          /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-lg w-fit mb-4", children: /* @__PURE__ */ jsx(step.icon, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: step.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: step.description })
        ]
      },
      step.title
    )) })
  ] }) });
};
const faqs = [
  {
    question: "¿Cuánto cuesta desarrollar una app?",
    answer: "Depende de las funcionalidades, las integraciones y el diseño que necesites. Tras una primera conversación te preparo un presupuesto detallado y sin compromiso, dividido por fases para que sepas exactamente qué incluye cada una."
  },
  {
    question: "¿Cuánto tiempo se tarda en tener la app publicada?",
    answer: "Varía según el alcance del proyecto. En la propuesta incluyo un calendario por fases y, durante el desarrollo, recibes entregas periódicas para ver los avances."
  },
  {
    question: "¿Desarrollas para iOS y Android a la vez?",
    answer: "Sí. Trabajo con tecnologías multiplataforma como Ionic, Capacitor y Flutter, que permiten tener la app en iOS, Android y Web con una sola base de código, reduciendo coste y mantenimiento."
  },
  {
    question: "¿Te encargas de publicar la app en App Store y Google Play?",
    answer: "Sí. Me ocupo de preparar y publicar la app en las tiendas y de acompañarte en el proceso de revisión de Apple y Google."
  },
  {
    question: "¿Trabajas solo con clientes de Canarias?",
    answer: "Estoy en Canarias y he trabajado en apps para comercios y asociaciones de Lanzarote, Fuerteventura y El Hierro, pero trabajo en remoto con clientes de toda España."
  },
  {
    question: "¿Puedes mejorar, mantener o migrar una app que ya tengo?",
    answer: "Sí. Reviso el estado actual del proyecto y te propongo cómo mejorarlo o modernizarlo, por ejemplo migrando de Ionic a Flutter o actualizando librerías y dependencias antiguas."
  }
];
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer }
  }))
};
const FAQ = () => {
  return /* @__PURE__ */ jsxs("section", { id: "faq", className: "py-20 sm:py-32", children: [
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(faqJsonLd) }) }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          viewport: { once: true },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
              "Preguntas ",
              /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "frecuentes" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto", children: "Lo que suelen preguntarme antes de empezar un proyecto" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto space-y-4", children: faqs.map((faq) => /* @__PURE__ */ jsxs(
        "details",
        {
          className: "group bg-card border border-border rounded-xl px-6 open:border-primary/40",
          children: [
            /* @__PURE__ */ jsxs("summary", { className: "flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-left font-semibold text-lg [&::-webkit-details-marker]:hidden", children: [
              /* @__PURE__ */ jsx("h3", { children: faq.question }),
              /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "pb-5 text-muted-foreground leading-relaxed", children: faq.answer })
          ]
        },
        faq.question
      )) })
    ] })
  ] });
};
const WhatsAppButton = () => {
  return /* @__PURE__ */ jsxs(
    motion.a,
    {
      href: WHATSAPP_URL,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": "Escríbeme por WhatsApp",
      title: "Escríbeme por WhatsApp",
      className: "fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg p-4 sm:px-5 sm:py-3 hover:bg-[#1ebe5b] transition-colors",
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4, delay: 1.2 },
      children: [
        /* @__PURE__ */ jsx(MessageCircle, { className: "w-6 h-6" }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline font-semibold", children: "WhatsApp" })
      ]
    }
  );
};
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "bg-card border-t border-border py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "inline-block", children: /* @__PURE__ */ jsx("img", { src: logo, alt: "JadrDev", width: 360, height: 208, className: "h-12 w-auto opacity-80 mx-auto md:mx-0" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Desarrollo de apps móviles y webs a medida para empresas, comercios y asociaciones de Canarias y toda España." })
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Servicios", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold mb-4", children: "Servicios" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: services.map((service) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/servicios/${service.slug}`, className: "text-muted-foreground hover:text-primary transition-colors", children: service.title }) }, service.slug)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-semibold mb-4", children: "Contacto" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "mailto:info@jadrdev.com", className: "text-muted-foreground hover:text-primary transition-colors", children: "info@jadrdev.com" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", className: "text-muted-foreground hover:text-primary transition-colors", children: [
            "WhatsApp: ",
            WHATSAPP_DISPLAY
          ] }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-muted-foreground hover:text-primary transition-colors", children: "Blog" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground text-center mt-10 pt-6 border-t border-border", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " JadrDev. Todos los derechos reservados."
    ] })
  ] }) });
};
const SITE_URL = "https://www.jadrdev.com";
const SITE_NAME = "JadrDev";
const toAbsolute = (path) => path.startsWith("http") ? path : `${SITE_URL}${path}`;
const SEO = ({
  title,
  description,
  image = "/og-image.jpg",
  url,
  type = "website",
  noindex = false,
  jsonLd: jsonLd2
}) => {
  const { pathname } = useLocation();
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = url ?? toAbsolute(pathname);
  const imageUrl = toAbsolute(image);
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("html", { lang: "es" }),
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    noindex ? /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, follow" }) : /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonical }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "es_ES" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: imageUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonical }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:site", content: "@jadrdevcm" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: imageUrl }),
    jsonLd2 && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(jsonLd2) })
  ] });
};
const sameAs = [
  "https://www.instagram.com/jadrdevcm",
  "https://www.tiktok.com/@jadrdevcm",
  "https://www.youtube.com/@jadrdevcm",
  "https://twitter.com/jadrdevcm",
  "https://github.com/jadrdev",
  "https://linkedin.com/in/jadrdev"
];
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "JadrDev",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    jobTitle: "Desarrollador Frontend y de Apps Móviles",
    email: "mailto:info@jadrdev.com",
    knowsAbout: ["Angular", "Ionic", "Flutter", "Capacitor", "TypeScript", "Desarrollo de apps móviles"],
    sameAs
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: "JadrDev - Desarrollo de apps móviles y webs",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    email: "info@jadrdev.com",
    telephone: "+34611831797",
    founder: { "@id": `${SITE_URL}/#person` },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Canarias" },
      { "@type": "Country", name: "España" }
    ],
    serviceType: [
      "Desarrollo de apps móviles iOS y Android",
      "Desarrollo frontend",
      "Apps de fidelización para comercios",
      "Migraciones tecnológicas",
      "Consultoría técnica"
    ],
    sameAs
  }
];
const Index = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Desarrollador de Apps Móviles en Canarias | Ionic, Angular y Flutter – JadrDev",
        description: "Creo apps móviles para iOS y Android y webs a medida para comercios, asociaciones y empresas en Canarias. 6 apps publicadas en App Store y Google Play. Pide presupuesto sin compromiso.",
        url: `${SITE_URL}/`,
        jsonLd
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Services, {}),
      /* @__PURE__ */ jsx(Projects, {}),
      /* @__PURE__ */ jsx(Process, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(Blog, {}),
      /* @__PURE__ */ jsx(FAQ, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] });
};
const BlogList = () => {
  const [activeTag, setActiveTag] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: posts, isLoading, error } = useQuery(allPostsQuery);
  const tags = useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    posts?.forEach((post) => {
      if (!post.primary_tag) return;
      const current = counts.get(post.primary_tag.slug);
      counts.set(post.primary_tag.slug, {
        name: post.primary_tag.name,
        count: (current?.count ?? 0) + 1
      });
    });
    return [...counts.entries()].sort((a, b) => b[1].count - a[1].count);
  }, [posts]);
  const visiblePosts = activeTag ? posts?.filter((post) => post.primary_tag?.slug === activeTag) : posts;
  const jsonLd2 = posts && {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de JadrDev",
    url: `${SITE_URL}/blog`,
    inLanguage: "es",
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "JadrDev" },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.published_at
    }))
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Blog de desarrollo de apps y web: Ionic, Angular, Flutter y más",
        description: "Artículos y tutoriales sobre desarrollo de apps móviles y web con Ionic, Angular, Flutter, Capacitor y Laravel, escritos por JadrDev desde Canarias.",
        url: `${SITE_URL}/blog`,
        jsonLd: jsonLd2 || void 0
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-28 pb-20", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "text-center max-w-3xl mx-auto mb-12", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl sm:text-5xl font-bold mb-6", children: [
          "Blog de ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "desarrollo" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg sm:text-xl text-muted-foreground", children: "Tutoriales y experiencias reales sobre desarrollo de apps móviles y web: Ionic, Angular, Flutter, Capacitor, Laravel y más." })
      ] }),
      tags.length > 1 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-2 mb-12", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTag(null),
            className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeTag === null ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-primary hover:border-primary"}`,
            children: [
              "Todos (",
              posts?.length,
              ")"
            ]
          }
        ),
        tags.map(([slug, tag]) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveTag(slug),
            className: `px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeTag === slug ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-primary hover:border-primary"}`,
            children: [
              tag.name,
              " (",
              tag.count,
              ")"
            ]
          },
          slug
        ))
      ] }),
      isLoading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 animate-spin text-primary" }) }) : error ? /* @__PURE__ */ jsx("p", { className: "text-center text-muted-foreground py-20", children: "No se pudieron cargar los artículos. Inténtalo de nuevo más tarde." }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: visiblePosts?.map((post, index) => /* @__PURE__ */ jsx(BlogCard, { post, index: index % 3 }, post.id)) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] });
};
const BlogPost = () => {
  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data: post, isLoading, error } = useQuery({
    ...postQuery(slug ?? ""),
    enabled: !!slug
  });
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(SEO, { title: "Cargando...", description: "Cargando artículo...", noindex: true }),
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-grow flex justify-center items-center", children: /* @__PURE__ */ jsx(Loader2, { className: "w-12 h-12 animate-spin text-primary" }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  if (error || !post) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsx(SEO, { title: "Artículo no encontrado", description: "El artículo que buscas no existe.", noindex: true }),
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow flex flex-col justify-center items-center p-4 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-4", children: "Artículo no encontrado" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Lo sentimos, no pudimos encontrar el artículo que buscas." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: "/", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 w-4 h-4" }),
          " Volver al inicio"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: post.meta_title || post.title,
        description: post.meta_description || post.custom_excerpt || post.excerpt || post.title,
        image: post.og_image || post.feature_image || void 0,
        url: `${SITE_URL}/blog/${post.slug}`,
        type: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.custom_excerpt || post.excerpt,
          image: post.feature_image || void 0,
          datePublished: post.published_at,
          dateModified: post.updated_at,
          inLanguage: "es",
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "JadrDev", url: SITE_URL },
          publisher: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "JadrDev" }
        }
      }
    ),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow pt-24 pb-16", children: /* @__PURE__ */ jsxs("article", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "mb-8",
          children: [
            /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, className: "mb-6 pl-0 hover:bg-transparent hover:text-primary", children: /* @__PURE__ */ jsxs(Link, { to: "/blog", children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 w-4 h-4" }),
              " Volver al blog"
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-muted-foreground mb-4", children: [
              post.primary_tag && /* @__PURE__ */ jsxs("span", { className: "flex items-center text-primary font-medium", children: [
                /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 mr-1" }),
                post.primary_tag.name
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4 mr-1" }),
                formatDate(post.published_at)
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-1" }),
                post.reading_time,
                " min de lectura"
              ] })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-5xl font-bold mb-6 leading-tight", children: post.title }),
            post.feature_image && /* @__PURE__ */ jsx("div", { className: "rounded-xl overflow-hidden mb-10 shadow-lg", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: post.feature_image,
                alt: post.title,
                className: "w-full h-auto object-cover max-h-[500px]"
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay: 0.2 },
          className: "prose prose-lg dark:prose-invert max-w-none \n              prose-headings:font-bold prose-headings:text-foreground\n              prose-p:text-muted-foreground prose-p:leading-relaxed\n              prose-a:text-primary prose-a:no-underline hover:prose-a:underline\n              prose-strong:text-foreground\n              prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none\n              prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border\n              prose-img:rounded-lg prose-img:shadow-md\n              prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r\n              ",
          dangerouslySetInnerHTML: { __html: post.html }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: [
    /* @__PURE__ */ jsx(SEO, { title: "Página no encontrada", description: "La página que buscas no existe.", noindex: true }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
      /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "La página que buscas no existe" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Volver al inicio" })
    ] })
  ] });
};
const ServicePage = () => {
  const { slug } = useParams();
  const service = slug ? getService(slug) : void 0;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (!service) return /* @__PURE__ */ jsx(NotFound, {});
  const url = `${SITE_URL}/servicios/${service.slug}`;
  const relatedProjects = projects.filter((project) => project.services.includes(service.slug));
  const otherServices = services.filter((other) => other.slug !== service.slug);
  const jsonLd2 = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.heading,
      description: service.seoDescription,
      url,
      serviceType: service.title,
      provider: { "@id": `${SITE_URL}/#service` },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Canarias" },
        { "@type": "Country", name: "España" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Servicios", item: `${SITE_URL}/#services` },
        { "@type": "ListItem", position: 3, name: service.title, item: url }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsx(SEO, { title: service.seoTitle, description: service.seoDescription, url, jsonLd: jsonLd2 }),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "flex-grow pt-28", children: [
      /* @__PURE__ */ jsxs("section", { className: "container mx-auto px-4 sm:px-6 lg:px-8 pb-16 max-w-4xl", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", asChild: true, className: "mb-6 pl-0 hover:bg-transparent hover:text-primary", children: /* @__PURE__ */ jsxs(Link, { to: "/#services", children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 w-4 h-4" }),
          " Todos los servicios"
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "p-3 bg-primary/10 rounded-lg w-fit mb-6", children: /* @__PURE__ */ jsx(service.icon, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl sm:text-5xl font-bold mb-8 leading-tight", children: service.heading }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4 text-lg sm:text-xl text-muted-foreground leading-relaxed", children: service.intro.map((paragraph) => /* @__PURE__ */ jsx("p", { children: paragraph }, paragraph)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 pt-8", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold", children: /* @__PURE__ */ jsx(Link, { to: "/#contact", children: "Pide presupuesto" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-primary text-primary hover:bg-primary/10 font-semibold", children: /* @__PURE__ */ jsx("a", { href: WHATSAPP_URL, target: "_blank", rel: "noopener noreferrer", children: "Escríbeme por WhatsApp" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold mb-12 text-center", children: [
          "Qué ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "incluye" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: service.includes.map((item) => /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-6", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-2 flex items-start gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary shrink-0 mt-0.5" }),
            item.title
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: item.description })
        ] }, item.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold mb-8 text-center", children: [
          "¿Para ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "quién" }),
          " es?"
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: service.audience.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-3 text-lg", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-6 h-6 text-primary shrink-0" }),
          item
        ] }, item)) })
      ] }) }),
      relatedProjects.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold mb-12 text-center", children: [
          "Proyectos ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "relacionados" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: relatedProjects.map((project, index) => /* @__PURE__ */ jsx(ProjectCard, { project, index: index % 3 }, project.title)) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold mb-12 text-center", children: [
          "Preguntas ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "frecuentes" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: service.faqs.map((faq) => /* @__PURE__ */ jsxs(
          "details",
          {
            className: "group bg-card border border-border rounded-xl px-6 open:border-primary/40",
            children: [
              /* @__PURE__ */ jsxs("summary", { className: "flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-left font-semibold text-lg [&::-webkit-details-marker]:hidden", children: [
                /* @__PURE__ */ jsx("h3", { children: faq.question }),
                /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5 text-primary shrink-0 transition-transform group-open:rotate-180" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "pb-5 text-muted-foreground leading-relaxed", children: faq.answer })
            ]
          },
          faq.question
        )) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 sm:py-24 bg-muted/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl sm:text-4xl font-bold mb-6", children: [
          "Hablemos de tu ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "proyecto" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground mb-8", children: "Cuéntame tu idea y te preparo una propuesta con presupuesto, sin compromiso." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold", children: /* @__PURE__ */ jsx(Link, { to: "/#contact", children: "Pide presupuesto" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mt-16 mb-6", children: "Otros servicios" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-3", children: otherServices.map((other) => /* @__PURE__ */ jsx(
          Link,
          {
            to: `/servicios/${other.slug}`,
            className: "px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors",
            children: other.title
          },
          other.slug
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(WhatsAppButton, {})
  ] });
};
const App = ({ queryClient }) => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(TooltipProvider, { children: [
  /* @__PURE__ */ jsx(Toaster$1, {}),
  /* @__PURE__ */ jsx(Toaster, {}),
  /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(BlogList, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/servicios/:slug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] })
] }) });
const render = async (url) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } }
  });
  await prefetchForPath(queryClient, url);
  const helmetContext = {};
  const html = renderToString(
    /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, { queryClient }) }) })
  );
  const { helmet } = helmetContext;
  const head = helmet ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((tags) => tags.toString()).join("\n    ") : "";
  return { html, head, state: dehydrate(queryClient) };
};
const getRoutes = async () => {
  const staticRoutes = ["/", "/blog", ...services.map((service) => `/servicios/${service.slug}`)];
  try {
    const posts = await ghost.posts.browse({ limit: "all", fields: ["slug", "updated_at"] });
    return {
      staticRoutes,
      posts: posts.map((post) => ({ path: `/blog/${post.slug}`, updatedAt: post.updated_at }))
    };
  } catch (error) {
    console.warn("Could not fetch posts from Ghost, skipping post prerendering:", error.message);
    return { staticRoutes, posts: [] };
  }
};
export {
  getRoutes,
  render
};
