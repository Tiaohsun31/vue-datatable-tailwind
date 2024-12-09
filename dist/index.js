var Tt = Object.defineProperty;
var Et = (e, t, r) => t in e ? Tt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var He = (e, t, r) => Et(e, typeof t != "symbol" ? t + "" : t, r);
import { defineComponent as V, computed as b, inject as be, openBlock as p, createElementBlock as h, withModifiers as dt, createElementVNode as x, normalizeClass as _, normalizeStyle as te, unref as n, withDirectives as We, vShow as Ue, createBlock as X, ref as G, watch as oe, onMounted as ft, onBeforeUnmount as Ot, toDisplayString as D, createVNode as K, Transition as Ht, withCtx as gt, Fragment as ee, renderList as he, createCommentVNode as H, renderSlot as L, toRefs as Dt, provide as at, useSlots as jt, mergeProps as W, normalizeProps as Be, guardReactiveProps as rt, createTextVNode as De, isRef as qt, createSlots as zt } from "vue";
const Wt = ["checked", "aria-checked"], Ut = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Kt = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Gt = /* @__PURE__ */ V({
  __name: "BaseCheckbox",
  props: {
    checked: {
      type: Boolean,
      default: !1
    },
    partial: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(e) {
    const t = e, r = b(() => t.checked), a = b(() => t.partial), c = be("themeClasses");
    return (d, v) => (p(), h("div", {
      class: "relative inline-flex items-center justify-center h-5 w-5 cursor-pointer group",
      onClick: v[0] || (v[0] = dt((o) => d.$emit("change"), ["stop", "prevent"]))
    }, [
      x("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: r.value,
        "aria-checked": r.value
      }, null, 8, Wt),
      x("div", {
        class: _(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          r.value && !a.value && [
            "bg-theme border-theme",
            "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          a.value && [
            "bg-theme border-theme",
            "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !r.value && !a.value && [
            "border-gray-300 bg-white",
            "group-hover:border-theme-light"
          ],
          // Focus states
          "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: te(n(c).style)
      }, [
        We((p(), h("svg", Ut, v[1] || (v[1] = [
          x("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ue, r.value && !a.value]
        ]),
        We((p(), h("svg", Kt, v[2] || (v[2] = [
          x("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ue, a.value]
        ])
      ], 6)
    ]));
  }
}), vt = /* @__PURE__ */ V({
  __name: "SingleSelectCheckBox",
  props: {
    checked: {
      type: Boolean,
      required: !0
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = t;
    return (a, c) => (p(), X(Gt, {
      checked: e.checked,
      partial: !1,
      onChange: c[0] || (c[0] = (d) => r("change"))
    }, null, 8, ["checked"]));
  }
}), Vt = /* @__PURE__ */ V({
  __name: "MultipleSelectCheckBox",
  props: {
    status: {
      type: String,
      required: !0
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = e, a = b(() => r.status === "allSelected"), c = b(() => r.status === "partSelected"), d = t;
    return (v, o) => (p(), X(vt, {
      checked: a.value,
      partial: c.value,
      onChange: o[0] || (o[0] = (i) => d("change", !a.value))
    }, null, 8, ["checked", "partial"]));
  }
}), Jt = { class: "relative inline-block min-w-[70px]" }, Yt = ["aria-expanded"], Zt = { class: "block truncate" }, Qt = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, Xt = ["aria-selected", "onClick"], ea = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, ta = /* @__PURE__ */ V({
  __name: "RowsSelector",
  props: {
    modelValue: {
      type: Number,
      required: !0
    },
    rowsItems: {
      type: Array,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const r = e, a = t, c = G(!1), d = G(!1), v = b({
      get: () => r.modelValue,
      set: (w) => a("update:modelValue", w)
    }), o = be("dataTable");
    oe(c, (w) => {
      if (w && (o != null && o.value)) {
        const k = window.innerHeight, S = o.value.getBoundingClientRect(), C = k - (S.height + S.top);
        d.value = C <= 100;
      }
    });
    const i = (w) => {
      v.value = w, c.value = !1;
    }, l = () => {
      c.value = !c.value;
    }, s = (w) => {
      w.target.closest(".relative") || (c.value = !1);
    }, m = (w) => {
      const k = w.relatedTarget;
      k != null && k.closest(".relative") || (c.value = !1);
    };
    return ft(() => {
      document.addEventListener("click", s);
    }), Ot(() => {
      document.removeEventListener("click", s);
    }), (w, k) => (p(), h("div", Jt, [
      x("button", {
        type: "button",
        class: _(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          c.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
        ]]),
        onClick: l,
        "aria-haspopup": "listbox",
        "aria-expanded": c.value
      }, [
        x("span", Zt, D(v.value), 1),
        x("span", Qt, [
          (p(), h("svg", {
            class: _(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": c.value }]),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, k[0] || (k[0] = [
            x("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 9l-7 7-7-7"
            }, null, -1)
          ]), 2))
        ])
      ], 10, Yt),
      K(Ht, {
        "enter-active-class": "transition duration-100 ease-out",
        "enter-from-class": "transform scale-95 opacity-0",
        "enter-to-class": "transform scale-100 opacity-100",
        "leave-active-class": "transition duration-75 ease-in",
        "leave-from-class": "transform scale-100 opacity-100",
        "leave-to-class": "transform scale-95 opacity-0"
      }, {
        default: gt(() => [
          c.value ? (p(), h("ul", {
            key: 0,
            class: _(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": d.value }]),
            tabindex: "-1",
            role: "listbox",
            onFocusout: m
          }, [
            (p(!0), h(ee, null, he(e.rowsItems, (S) => (p(), h("li", {
              key: S,
              class: _(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                S === v.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
              ]]),
              role: "option",
              "aria-selected": S === v.value,
              onClick: (C) => i(S)
            }, [
              x("span", {
                class: _(["block", { "font-medium": S === v.value }])
              }, D(S), 3),
              S === v.value ? (p(), h("span", ea, k[1] || (k[1] = [
                x("svg", {
                  class: "h-4 w-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor"
                }, [
                  x("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5 13l4 4L19 7"
                  })
                ], -1)
              ]))) : H("", !0)
            ], 10, Xt))), 128))
          ], 34)) : H("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), aa = { class: "inline-flex relative w-[60px] h-[60px]" }, ra = /* @__PURE__ */ V({
  __name: "Loading",
  setup(e) {
    const t = be("themeClasses");
    return (r, a) => (p(), h("div", aa, [
      (p(), h(ee, null, he(4, (c) => x("div", {
        key: c,
        class: _(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(c - 1) * 150}`]]),
        style: te({
          borderTopColor: n(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), le = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [a, c] of t)
    r[a] = c;
  return r;
}, sa = /* @__PURE__ */ le(ra, [["__scopeId", "data-v-e9a27991"]]), na = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, oa = /* @__PURE__ */ V({
  __name: "LoadingLine",
  setup(e) {
    const t = be("themeClasses");
    return (r, a) => (p(), h("div", na, [
      x("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: te({ backgroundColor: n(t).hex })
      }, null, 4)
    ]));
  }
}), la = /* @__PURE__ */ le(oa, [["__scopeId", "data-v-cbdc3562"]]), ia = {}, ua = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function ca(e, t) {
  return p(), h("svg", ua, t[0] || (t[0] = [
    x("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const pt = /* @__PURE__ */ le(ia, [["render", ca]]), da = {}, fa = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function ga(e, t) {
  return p(), h("svg", fa, t[0] || (t[0] = [
    x("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const ht = /* @__PURE__ */ le(da, [["render", ga]]), va = {}, pa = { class: "px-3 py-1.5" };
function ha(e, t) {
  return p(), h("span", pa, t[0] || (t[0] = [
    x("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      x("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const ma = /* @__PURE__ */ le(va, [["render", ha]]), ya = {}, ba = {
  class: "w-4 h-4 transition-transform duration-200",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function xa(e, t) {
  return p(), h("svg", ba, t[0] || (t[0] = [
    x("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const wa = /* @__PURE__ */ le(ya, [["render", xa]]), ka = {}, Pa = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ca(e, t) {
  return p(), h("svg", Pa, t[0] || (t[0] = [
    x("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const _a = /* @__PURE__ */ le(ka, [["render", Ca]]), Sa = {}, Ia = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function $a(e, t) {
  return p(), h("svg", Ia, t[0] || (t[0] = [
    x("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Ba = /* @__PURE__ */ le(Sa, [["render", $a]]), Aa = {
  class: "inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Na = ["onClick"], pe = 7, Ma = /* @__PURE__ */ V({
  __name: "ButtonsPagination",
  props: {
    maxPaginationNumber: {
      type: Number,
      required: !0
    },
    currentPaginationNumber: {
      type: Number,
      required: !0
    }
  },
  emits: ["updatePage"],
  setup(e, { emit: t }) {
    const r = e, a = t, c = be("themeClasses"), d = (o) => {
      o.type === "button" && !o.active && a("updatePage", o.page);
    }, v = b(() => {
      const o = [], { maxPaginationNumber: i, currentPaginationNumber: l } = r;
      if (i <= pe) {
        for (let s = 1; s <= i; s += 1)
          o.push({
            type: "button",
            page: s,
            active: s === l,
            activePrev: s + 1 === l
          });
        return o;
      }
      if ([1, 2, i, i - 1].includes(l))
        for (let s = 1; s <= pe; s += 1)
          if (s <= 3)
            o.push({
              type: "button",
              page: s,
              active: s === l,
              activePrev: s + 1 === l
            });
          else if (s === 4)
            o.push({ type: "omission" });
          else {
            const m = i - (pe - s);
            o.push({
              type: "button",
              page: m,
              active: m === l,
              activePrev: m + 1 === l
            });
          }
      else if ([3, 4].includes(l))
        for (let s = 1; s <= pe; s += 1)
          s <= 5 ? o.push({
            type: "button",
            page: s,
            active: s === l,
            activePrev: s + 1 === l
          }) : s === 6 ? o.push({ type: "omission" }) : o.push({
            type: "button",
            page: i,
            active: i === l,
            activePrev: !1
          });
      else if ([i - 2, i - 3].includes(l))
        for (let s = 1; s <= pe; s += 1)
          if (s === 1)
            o.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (s === 2)
            o.push({ type: "omission" });
          else {
            const m = i - (pe - s);
            o.push({
              type: "button",
              page: m,
              active: m === l,
              activePrev: m + 1 === l
            });
          }
      else
        for (let s = 1; s <= pe; s += 1)
          if (s === 1)
            o.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (s === 2 || s === 6)
            o.push({ type: "omission" });
          else if (s === 7)
            o.push({
              type: "button",
              page: i,
              active: i === l,
              activePrev: !1
            });
          else {
            const m = 4 - s, w = l - m;
            o.push({
              type: "button",
              page: w,
              active: w === l,
              activePrev: w + 1 === l
            });
          }
      return o;
    });
    return (o, i) => (p(), h("div", Aa, [
      (p(!0), h(ee, null, he(v.value, (l, s) => (p(), h("div", {
        key: s,
        class: _(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          s === 0 && "rounded-l-md",
          // Last item styles
          s === v.value.length - 1 && "rounded-r-md",
          // Button specific styles
          l.type === "button" && [
            "border border-gray-300",
            // Active state
            l.active ? [
              "z-10",
              n(c).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${n(c).tailwindName}-500`,
              `focus:border-${n(c).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !l.active && "cursor-pointer",
            // Connect borders for middle buttons
            s !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          l.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            s !== 0 && "-ml-px"
          ]
        ]]),
        style: te(n(c).style),
        onClick: (m) => d(l)
      }, [
        l.type === "button" ? (p(), h("span", {
          key: 0,
          class: _(["px-3 py-1.5", { "font-medium": l.active }])
        }, D(l.page), 3)) : (p(), X(n(ma), { key: 1 }))
      ], 14, Na))), 128))
    ]));
  }
}), Ra = {
  class: "flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, La = ["disabled"], Fa = ["disabled"], Ta = /* @__PURE__ */ V({
  __name: "PaginationArrows",
  props: {
    isFirstPage: {
      type: Boolean,
      required: !0,
      default: !1
    },
    isLastPage: {
      type: Boolean,
      required: !0,
      default: !1
    }
  },
  emits: ["clickPrevPage", "clickNextPage"],
  setup(e, { emit: t }) {
    const r = t;
    return (a, c) => (p(), h("div", Ra, [
      x("button", {
        type: "button",
        class: _(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isFirstPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isFirstPage,
        onClick: c[0] || (c[0] = (d) => r("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        K(n(ht), {
          class: _({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, La),
      L(a.$slots, "buttonsPagination"),
      x("button", {
        type: "button",
        class: _(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isLastPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isLastPage,
        onClick: c[1] || (c[1] = (d) => r("clickNextPage")),
        "aria-label": "Next page"
      }, [
        K(n(pt), {
          class: _({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Fa)
    ]));
  }
}), Ea = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Oa = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Ha = { class: "w-64" }, Da = { class: "h-2 bg-gray-200 rounded" }, ja = { class: "text-center text-sm text-gray-600" }, qa = /* @__PURE__ */ V({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = be("themeClasses");
    return (r, a) => (p(), h("div", Ea, [
      x("div", Oa, [
        a[0] || (a[0] = x("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        x("div", Ha, [
          x("div", Da, [
            x("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: te({ width: `${r.progress}%`, backgroundColor: n(t).hex })
            }, null, 4)
          ])
        ]),
        x("div", ja, D(Math.round(r.progress)) + "% ", 1)
      ])
    ]));
  }
});
function za(e, t, r, a) {
  return {
    clickRow: (d, v, o) => {
      if (e.value !== v) return;
      const i = { ...d };
      if (t.value) {
        const { checkbox: l } = d;
        delete i.checkbox, i.isSelected = l;
      }
      if (r.value) {
        const { index: l } = d;
        delete i.index, i.indexInCurrentPage = l;
      }
      a("clickRow", i, o);
    }
  };
}
function Wa(e, t, r) {
  const a = G([]);
  return {
    expandingItemIndexList: a,
    // 展開項的索引列表
    updateExpandingItemIndexList: (v, o, i) => {
      i.stopPropagation();
      const l = a.value.indexOf(v);
      if (l !== -1)
        a.value.splice(l, 1);
      else {
        const s = e.value.findIndex((m) => JSON.stringify(m) === JSON.stringify(o));
        r("expandRow", t.value + s, o), a.value.push(t.value + s);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      a.value = [];
    }
    // 清空展開列表的方法
  };
}
function Ua(e) {
  const t = b(() => e.value.filter((c) => c.fixed)), r = b(() => t.value.length ? t.value[t.value.length - 1].value : ""), a = b(() => {
    if (!t.value.length) return [];
    const c = t.value.map((d) => d.width ?? 100);
    return t.value.map((d, v) => ({
      value: d.value,
      // 列標籤
      fixed: d.fixed ?? !0,
      // 是否固定
      width: d.width ?? 100,
      // 列寬度
      // 計算距離左側的距離
      distance: v === 0 ? 0 : c.reduce((o, i, l) => {
        let s = o;
        return l < v && (s += i), s;
      })
    }));
  });
  return {
    fixedHeaders: t,
    lastFixedColumn: r,
    fixedColumnsInfos: a
  };
}
function Ka(e, t, r, a, c, d, v, o, i, l, s, m, w, k, S, C, B, R, F) {
  const q = b(() => v.value.length ? {
    hasFixedColumns: v.value.some((I) => I.fixed),
    fixedHeaders: v.value.filter((I) => I.fixed),
    unFixedHeaders: v.value.filter((I) => !I.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), E = G(
    Ga(S.value, C.value, B.value)
  ), { determineHeaderSortState: xe } = Ya(s, w, B, E), me = b(() => {
    const { fixedHeaders: I, unFixedHeaders: O } = q.value, T = [...I, ...O].map((f) => ({
      ...f,
      sortType: f.sortable ? xe(f.value) : void 0
    }));
    return [
      ...Object.values(ae.value).filter(Boolean),
      ...T
    ];
  }), ae = b(() => ({
    checkbox: l.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: a.value || q.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: k.value && {
      text: e.value,
      value: "index",
      fixed: d.value || q.value.hasFixedColumns,
      width: i.value
    },
    expand: o.value && {
      text: "",
      value: "expand",
      fixed: c.value || q.value.hasFixedColumns,
      width: r.value
    }
  })), re = b(
    () => me.value.map((I) => I.value)
  ), we = (I, O) => {
    const T = O === "none" ? "asc" : O === "asc" ? "desc" : m.value ? "asc" : null;
    if (s.value) {
      R(I, T);
      return;
    }
    const f = B.value ? Va(I, T, E.value) : Ja(I, T);
    E.value = f, F("updateSort", { sortType: T, sortBy: I });
  }, z = b(() => (I) => {
    var T, f;
    const O = s.value ? (T = w.value) == null ? void 0 : T.sortBy : (f = E.value) == null ? void 0 : f.sortBy;
    return Array.isArray(O) && O.includes(I);
  }), ke = b(() => (I) => {
    var T, f;
    const O = s.value ? (T = w.value) == null ? void 0 : T.sortBy : (f = E.value) == null ? void 0 : f.sortBy;
    return Array.isArray(O) ? O.indexOf(I) + 1 : !1;
  });
  return {
    clientSortOptions: E,
    headerColumns: re,
    headersForRender: me,
    updateSortField: we,
    isMultiSorting: z,
    getMultiSortNumber: ke
  };
}
function Ga(e, t, r) {
  return r && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((a) => a === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const Va = (e, t, r) => {
  if (!(r != null && r.sortBy) || !Array.isArray(r.sortBy) || !Array.isArray(r.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const a = r.sortBy.indexOf(e), c = [...r.sortBy], d = [...r.sortDesc];
  return a === -1 && t !== null ? (c.push(e), d.push(t === "desc")) : t === null ? (c.splice(a, 1), d.splice(a, 1)) : d[a] = t === "desc", { sortBy: c, sortDesc: d };
}, Ja = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function Ya(e, t, r, a) {
  const c = (o) => !e.value || !t.value ? d(o) : v(o), d = (o) => {
    if (!a.value) return "none";
    const { sortBy: i, sortDesc: l } = a.value;
    if (r.value && Array.isArray(i) && Array.isArray(l)) {
      const s = i.indexOf(o);
      return s !== -1 ? l[s] ? "desc" : "asc" : "none";
    }
    return o === i ? l ? "desc" : "asc" : "none";
  }, v = (o) => {
    const { sortBy: i, sortType: l } = t.value;
    if (r.value && Array.isArray(i) && Array.isArray(l)) {
      const s = i.indexOf(o);
      return s !== -1 ? l[s] : "none";
    }
    return o === i && l ? l : "none";
  };
  return {
    determineHeaderSortState: c
  };
}
class Za {
  constructor() {
    He(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    He(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let r = this.itemKeyCache.get(t);
    if (!r) {
      const { checkbox: a, index: c, ...d } = t;
      r = Object.entries(d).sort(([v], [o]) => v.localeCompare(o)).map(([v, o]) => `${v}:${o}`).join("|"), this.itemKeyCache.set(t, r);
    }
    return r;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function Qa(e, t, r, a, c, d, v, o, i) {
  const l = new Za(), s = b(
    () => (e.value - 1) * c.value + 1
  ), m = b(() => r.value ? Math.min(
    i.value,
    e.value * c.value
  ) : Math.min(
    o.value.length,
    e.value * c.value
  )), w = b(() => r.value ? a.value : o.value.slice(
    s.value - 1,
    m.value
  )), k = b(() => v.value ? w.value.map((B, R) => ({
    index: s.value + R,
    ...B
  })) : w.value), S = b(() => d.value.length === 0 || !d.value.some(
    (R) => o.value.some(
      (F) => l.getItemKey(R) === l.getItemKey(F)
    )
  ) ? "noneSelected" : d.value.length === o.value.length && d.value.every(
    (F) => o.value.some(
      (q) => l.getItemKey(F) === l.getItemKey(q)
    )
  ) ? "allSelected" : "partSelected"), C = b(() => {
    if (!t.value)
      return k.value;
    switch (S.value) {
      case "allSelected":
        return k.value.map((B) => ({
          checkbox: !0,
          ...B
        }));
      case "noneSelected":
        return k.value.map((B) => ({
          checkbox: !1,
          ...B
        }));
      default:
        return k.value.map((B) => ({
          checkbox: d.value.some(
            (F) => l.getItemKey(B) === l.getItemKey(F)
          ),
          ...B
        }));
    }
  });
  return {
    currentPageFirstIndex: s,
    currentPageLastIndex: m,
    multipleSelectStatus: S,
    pageItems: C
  };
}
function Xa(e, t, r, a, c, d, v) {
  const o = G(d.value ? d.value.page : e.value), i = b(() => Math.ceil(a.value / c.value)), l = b(() => i.value === 0 || o.value === i.value), s = b(() => o.value === 1);
  return {
    currentPaginationNumber: o,
    maxPaginationNumber: i,
    isLastPage: l,
    isFirstPage: s,
    nextPage: () => {
      if (a.value !== 0 && !l.value && !r.value)
        if (t.value) {
          const C = o.value + 1;
          v(C);
        } else
          o.value += 1;
    },
    prevPage: () => {
      if (a.value !== 0 && !s.value && !r.value)
        if (t.value) {
          const C = o.value - 1;
          v(C);
        } else
          o.value -= 1;
    },
    updatePage: (C) => {
      r.value || (t.value ? v(C) : o.value = C);
    },
    updateCurrentPaginationNumber: (C) => {
      o.value = C;
    }
  };
}
function er(e, t, r, a) {
  var o;
  const c = b(() => !e.value && t.value.findIndex((i) => i === a.value) === -1 ? [a.value, ...t.value] : t.value), d = G(((o = r.value) == null ? void 0 : o.rowsPerPage) ?? a.value);
  return {
    rowsItemsComputed: c,
    // 計算後的每頁行數選項
    rowsPerPageRef: d,
    // 每頁行數
    updateRowsPerPage: (i) => {
      d.value = i;
    }
    // 更新每頁行數
  };
}
function tr(e, t, r) {
  const a = b({
    get: () => {
      if (e.value) {
        const { page: o, rowsPerPage: i, sortBy: l, sortType: s } = e.value;
        return { page: o, rowsPerPage: i, sortBy: l ?? null, sortType: s ?? null };
      }
      return null;
    },
    set: (o) => {
      r("update:serverOptions", o);
    }
  });
  return {
    serverOptionsComputed: a,
    updateServerOptionsPage: (o) => {
      a.value && (a.value = {
        ...a.value,
        page: o
      });
    },
    updateServerOptionsSort: (o, i) => {
      if (a.value)
        if (t.value && Array.isArray(a.value.sortBy) && Array.isArray(a.value.sortType)) {
          const l = a.value.sortBy.findIndex((s) => s === o);
          l === -1 && i !== null && (a.value.sortBy.push(o), a.value.sortType.push(i)), i === null ? (a.value.sortBy.splice(l, 1), a.value.sortType.splice(l, 1)) : a.value.sortType[l] = i;
        } else
          a.value = {
            ...a.value,
            sortBy: i !== null ? o : null,
            sortType: i
          };
    },
    updateServerOptionsRowsPerPage: (o) => {
      a.value && (a.value = {
        ...a.value,
        page: 1,
        rowsPerPage: o
      });
    }
  };
}
function ar(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function rr(e) {
  return e.comparison === "in";
}
function sr(e) {
  return typeof e.comparison == "function";
}
function nr(e) {
  return typeof e == "number" && !isNaN(e);
}
const qr = {
  number(e, t, r) {
    return { field: e, comparison: t, criteria: r };
  },
  string(e, t, r) {
    return { field: e, comparison: t, criteria: r };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, r) {
    return { field: e, comparison: t, criteria: r };
  }
};
function U(e, t) {
  if (e.includes(".")) {
    const r = e.split(".");
    let a = t;
    for (const c of r)
      if (a && typeof a == "object")
        a = a[c];
      else
        return "";
    return a ?? "";
  }
  return t[e] ?? "";
}
function or(e, t) {
  const r = U(e, t);
  return Array.isArray(r) ? r.join(",") : r;
}
const st = 1e3, nt = /* @__PURE__ */ new WeakMap(), Re = (e) => {
  let t = nt.get(e);
  if (!t) {
    const { checkbox: r, index: a, ...c } = e;
    t = JSON.stringify(c), nt.set(e, t);
  }
  return t;
};
function lr(e, t, r) {
  const a = G({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  oe(t, (l) => {
    if (l === null) {
      a.value.selectedItems.clear(), a.value.itemsMap.clear();
      return;
    }
    const s = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const w of l) {
      const k = Re(w);
      s.add(k), m.set(k, w);
    }
    a.value.selectedItems = s, a.value.itemsMap = m;
  }, { immediate: !0, deep: !0 });
  const c = async (l, s, m) => new Promise((w) => {
    requestAnimationFrame(() => {
      const k = new Set(a.value.selectedItems), S = new Map(a.value.itemsMap);
      for (let C = 0; C < l.length; C++) {
        const B = l[C], R = Re(B);
        s ? (k.add(R), S.set(R, B)) : k.delete(R), a.value.processedCount = m + C + 1, a.value.visualProgress = a.value.processedCount / a.value.totalCount * 100;
      }
      a.value.selectedItems = k, a.value.itemsMap = S, w();
    });
  }), d = async (l) => {
    if (!a.value.selectionInProgress)
      try {
        if (a.value.selectionInProgress = !0, a.value.processedCount = 0, a.value.totalCount = e.value.length, a.value.visualProgress = 0, !l) {
          a.value.selectedItems.clear(), a.value.itemsMap.clear(), r("update:itemsSelected", []), a.value.visualProgress = 100;
          return;
        }
        const s = e.value;
        for (let m = 0; m < s.length; m += st) {
          const w = s.slice(m, Math.min(m + st, s.length));
          await c(w, l, m), await new Promise((k) => setTimeout(k, 0));
        }
        r("update:itemsSelected", o.value), l && r("selectAll");
      } finally {
        a.value.selectionInProgress = !1;
      }
  }, v = (l) => {
    const s = Re(l), m = { ...l };
    delete m.checkbox, delete m.index;
    const w = new Set(a.value.selectedItems), k = new Map(a.value.itemsMap);
    w.has(s) ? (w.delete(s), r("deselectRow", m)) : (w.add(s), k.set(s, m), r("selectRow", m)), a.value.selectedItems = w, a.value.itemsMap = k, r("update:itemsSelected", Array.from(k.values()).filter((C) => w.has(Re(C))));
  }, o = b(() => a.value.selectedItems.size === 0 ? [] : Array.from(a.value.itemsMap.entries()).filter(([l]) => a.value.selectedItems.has(l)).map(([, l]) => l)), i = b(() => a.value.visualProgress);
  return {
    selectedItems: o,
    toggleSelectAll: d,
    toggleSelectItem: v,
    isProcessing: b(() => a.value.selectionInProgress),
    selectionProgress: i
  };
}
function ir(e, t, r, a, c, d, v, o, i, l, s) {
  const m = /* @__PURE__ */ new WeakMap(), w = (f) => {
    let y = m.get(f);
    return y || (typeof d.value == "string" && d.value !== "" ? y = String(U(d.value, f)) : Array.isArray(d.value) ? y = d.value.map((P) => String(U(P, f))).join(" ") : y = Object.values(f).map(String).join(" "), m.set(f, y)), y;
  }, k = b(() => {
    if (!r.value && v.value !== "") {
      const f = new RegExp(v.value, "i");
      return a.value.filter((y) => f.test(w(y)));
    }
    return a.value;
  }), S = (f, y) => {
    const P = nr(f) ? f : parseFloat(String(f));
    if (isNaN(P)) return !1;
    if (y.comparison === "between" && Array.isArray(y.criteria)) {
      const [J, se] = y.criteria;
      return P >= J && P <= se;
    }
    const A = y.criteria;
    switch (y.comparison) {
      case ">":
        return P > A;
      case ">=":
        return P >= A;
      case "<":
        return P < A;
      case "<=":
        return P <= A;
      default:
        return !1;
    }
  }, C = b(() => {
    var f;
    return (f = t.value) != null && f.length ? k.value.filter(
      (y) => t.value.every((P) => {
        const A = U(P.field, y);
        return sr(P) ? P.comparison(A, P.criteria) : ar(P) ? S(A, P) : rr(P) ? P.criteria.includes(A) : P.comparison === "=" ? A === P.criteria : A !== P.criteria;
      })
    ) : k.value;
  }), B = (f, y, P) => f === y ? 0 : f == null ? 1 : y == null ? -1 : f < y ? P ? 1 : -1 : P ? -1 : 1, R = (f, y, P, A) => A < 0 ? f : R(f, y, P, A - 1).sort((J, se) => {
    if (!y.slice(0, A).every((j) => U(j, J) === U(j, se))) return 0;
    const Pe = y[A], Ce = U(Pe, J), _e = U(Pe, se);
    return B(Ce, _e, P[A]);
  }), F = b(() => {
    if (r.value) return a.value;
    if (!e.value) return C.value;
    const { sortBy: f, sortDesc: y } = e.value, P = [...C.value];
    return i.value && Array.isArray(f) && Array.isArray(y) ? f.length ? R(P, f, y, f.length - 1) : P : P.sort((A, J) => {
      const se = U(f, A), Ae = U(f, J);
      return B(se, Ae, y);
    });
  }), q = b(() => r.value ? o.value : F.value.length), E = b(() => r.value ? !1 : (r.value ? o.value : a.value.length) >= l.value), {
    selectedItems: xe,
    toggleSelectAll: me,
    toggleSelectItem: ae,
    isProcessing: re,
    selectionProgress: we
  } = lr(F, c, s), z = b({
    get: () => c.value ?? [],
    set: (f) => {
      s("update:itemsSelected", f);
    }
  }), ke = (f) => {
    z.value = f ? F.value : [], f && s("selectAll");
  }, I = (f) => {
    const y = f.checkbox;
    if (delete f.checkbox, delete f.index, y)
      z.value = z.value.filter(
        (P) => JSON.stringify(P) !== JSON.stringify(f)
      ), s("deselectRow", f);
    else {
      const P = z.value;
      P.unshift(f), z.value = P, s("selectRow", f);
    }
  };
  return {
    totalItems: F,
    selectItemsComputed: z,
    totalItemsLength: q,
    toggleSelectAll: (f) => {
      if (E.value) {
        s("updateSelectionStatus", !0);
        try {
          me(f), s("update:itemsSelected", f ? Array.from(xe.value) : []), f && s("selectAll");
        } finally {
          s("updateSelectionStatus", !1);
        }
      } else
        ke(f);
    },
    toggleSelectItem: (f) => {
      E.value ? ae(f) : I(f);
    },
    isProcessing: b(() => E.value && re.value),
    processProgress: we
  };
}
function ur(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, qe = {}, Le = { exports: {} }, ot;
function cr() {
  if (ot) return Le.exports;
  ot = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Le.exports = t(), Le.exports.createColors = t, Le.exports;
}
var lt;
function dr() {
  return lt || (lt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, l) {
      for (var s in l) Object.defineProperty(i, s, {
        enumerable: !0,
        get: l[s]
      });
    }
    t(e, {
      dim: function() {
        return v;
      },
      default: function() {
        return o;
      }
    });
    const r = /* @__PURE__ */ a(/* @__PURE__ */ cr());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    let c = /* @__PURE__ */ new Set();
    function d(i, l, s) {
      typeof process < "u" && process.env.JEST_WORKER_ID || s && c.has(s) || (s && c.add(s), console.warn(""), l.forEach((m) => console.warn(i, "-", m)));
    }
    function v(i) {
      return r.default.dim(i);
    }
    const o = {
      info(i, l) {
        d(r.default.bold(r.default.cyan("info")), ...Array.isArray(i) ? [
          i
        ] : [
          l,
          i
        ]);
      },
      warn(i, l) {
        d(r.default.bold(r.default.yellow("warn")), ...Array.isArray(i) ? [
          i
        ] : [
          l,
          i
        ]);
      },
      risk(i, l) {
        d(r.default.bold(r.default.magenta("risk")), ...Array.isArray(i) ? [
          i
        ] : [
          l,
          i
        ]);
      }
    };
  }(qe)), qe;
}
var it;
function fr() {
  return it || (it = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const t = /* @__PURE__ */ r(dr());
    function r(d) {
      return d && d.__esModule ? d : {
        default: d
      };
    }
    function a({ version: d, from: v, to: o }) {
      t.default.warn(`${v}-color-renamed`, [
        `As of Tailwind CSS ${d}, \`${v}\` has been renamed to \`${o}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const c = {
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",
      slate: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617"
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
        950: "#030712"
      },
      zinc: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b"
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a"
      },
      stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917",
        950: "#0c0a09"
      },
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a"
      },
      orange: {
        50: "#fff7ed",
        100: "#ffedd5",
        200: "#fed7aa",
        300: "#fdba74",
        400: "#fb923c",
        500: "#f97316",
        600: "#ea580c",
        700: "#c2410c",
        800: "#9a3412",
        900: "#7c2d12",
        950: "#431407"
      },
      amber: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03"
      },
      yellow: {
        50: "#fefce8",
        100: "#fef9c3",
        200: "#fef08a",
        300: "#fde047",
        400: "#facc15",
        500: "#eab308",
        600: "#ca8a04",
        700: "#a16207",
        800: "#854d0e",
        900: "#713f12",
        950: "#422006"
      },
      lime: {
        50: "#f7fee7",
        100: "#ecfccb",
        200: "#d9f99d",
        300: "#bef264",
        400: "#a3e635",
        500: "#84cc16",
        600: "#65a30d",
        700: "#4d7c0f",
        800: "#3f6212",
        900: "#365314",
        950: "#1a2e05"
      },
      green: {
        50: "#f0fdf4",
        100: "#dcfce7",
        200: "#bbf7d0",
        300: "#86efac",
        400: "#4ade80",
        500: "#22c55e",
        600: "#16a34a",
        700: "#15803d",
        800: "#166534",
        900: "#14532d",
        950: "#052e16"
      },
      emerald: {
        50: "#ecfdf5",
        100: "#d1fae5",
        200: "#a7f3d0",
        300: "#6ee7b7",
        400: "#34d399",
        500: "#10b981",
        600: "#059669",
        700: "#047857",
        800: "#065f46",
        900: "#064e3b",
        950: "#022c22"
      },
      teal: {
        50: "#f0fdfa",
        100: "#ccfbf1",
        200: "#99f6e4",
        300: "#5eead4",
        400: "#2dd4bf",
        500: "#14b8a6",
        600: "#0d9488",
        700: "#0f766e",
        800: "#115e59",
        900: "#134e4a",
        950: "#042f2e"
      },
      cyan: {
        50: "#ecfeff",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#164e63",
        950: "#083344"
      },
      sky: {
        50: "#f0f9ff",
        100: "#e0f2fe",
        200: "#bae6fd",
        300: "#7dd3fc",
        400: "#38bdf8",
        500: "#0ea5e9",
        600: "#0284c7",
        700: "#0369a1",
        800: "#075985",
        900: "#0c4a6e",
        950: "#082f49"
      },
      blue: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
        950: "#172554"
      },
      indigo: {
        50: "#eef2ff",
        100: "#e0e7ff",
        200: "#c7d2fe",
        300: "#a5b4fc",
        400: "#818cf8",
        500: "#6366f1",
        600: "#4f46e5",
        700: "#4338ca",
        800: "#3730a3",
        900: "#312e81",
        950: "#1e1b4b"
      },
      violet: {
        50: "#f5f3ff",
        100: "#ede9fe",
        200: "#ddd6fe",
        300: "#c4b5fd",
        400: "#a78bfa",
        500: "#8b5cf6",
        600: "#7c3aed",
        700: "#6d28d9",
        800: "#5b21b6",
        900: "#4c1d95",
        950: "#2e1065"
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7e22ce",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764"
      },
      fuchsia: {
        50: "#fdf4ff",
        100: "#fae8ff",
        200: "#f5d0fe",
        300: "#f0abfc",
        400: "#e879f9",
        500: "#d946ef",
        600: "#c026d3",
        700: "#a21caf",
        800: "#86198f",
        900: "#701a75",
        950: "#4a044e"
      },
      pink: {
        50: "#fdf2f8",
        100: "#fce7f3",
        200: "#fbcfe8",
        300: "#f9a8d4",
        400: "#f472b6",
        500: "#ec4899",
        600: "#db2777",
        700: "#be185d",
        800: "#9d174d",
        900: "#831843",
        950: "#500724"
      },
      rose: {
        50: "#fff1f2",
        100: "#ffe4e6",
        200: "#fecdd3",
        300: "#fda4af",
        400: "#fb7185",
        500: "#f43f5e",
        600: "#e11d48",
        700: "#be123c",
        800: "#9f1239",
        900: "#881337",
        950: "#4c0519"
      },
      get lightBlue() {
        return a({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return a({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return a({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return a({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return a({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(je)), je;
}
var ze, ut;
function gr() {
  if (ut) return ze;
  ut = 1;
  let e = fr();
  return ze = (e.__esModule ? e : { default: e }).default, ze;
}
var vr = gr();
const Q = /* @__PURE__ */ ur(vr), Ke = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, pr = (e) => {
  const t = ct(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let r = { color: "indigo", variant: "DEFAULT" }, a = 1 / 0;
  const c = Object.entries(Q).reduce((d, [v, o]) => {
    if (typeof o == "object") {
      const i = v;
      Object.entries(Ke).forEach(([l, s]) => {
        o[s] && (d[o[s]] = { color: i, variant: l });
      });
    }
    return d;
  }, {});
  return Object.entries(c).forEach(([d, v]) => {
    const o = ct(d);
    if (!o) return;
    const i = yr(t, o);
    i < a && (a = i, r = v);
  }), r;
}, hr = (e, t) => {
  const r = Ke[t], a = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": Q[e][r],
    "--theme-border": Q[e][r],
    "--theme-hover": Q[e][a],
    "--theme-active": Q[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": Q.gray[300],
    "--theme-light": Q[e]["400"],
    "--theme-focus": Q[e][r] + "80"
    // 添加 50% 透明度
  };
}, mr = (e) => {
  const { color: t, variant: r = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? pr(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : Q[t][Ke[r]],
    tailwindName: t,
    style: hr(t, r)
  };
};
function ct(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function yr(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const br = ["id"], xr = ["onClick"], wr = {
  key: 1,
  class: "items-center gap-2"
}, kr = {
  key: 3,
  class: "header-text"
}, Pr = {
  key: 5,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, Cr = {
  key: 3,
  class: "text-sm divide-y divide-gray-200"
}, _r = ["onClick", "onDblclick", "onContextmenu"], Sr = ["onClick"], Ir = ["onClick"], $r = ["colspan"], Br = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Ar = { class: "relative z-10" }, Nr = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Mr = { class: "flex flex-1 justify-between sm:hidden" }, Rr = ["disabled"], Lr = ["disabled"], Fr = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Tr = {
  key: 0,
  class: "flex items-center gap-2 text-sm text-gray-700"
}, Er = {
  key: 1,
  class: "text-sm text-gray-700"
}, Or = { key: 1 }, mt = /* @__PURE__ */ V({
  __name: "DataTable",
  props: {
    items: { default: () => [] },
    headers: { default: () => [] },
    currentPage: { default: 1 },
    rowsPerPage: { default: 25 },
    rowsItems: { default: () => [25, 50, 100] },
    hideFooter: { type: Boolean, default: !1 },
    hideRowsPerPage: { type: Boolean, default: !1 },
    rowsPerPageMessage: { default: "rows per page:" },
    rowsOfPageSeparatorMessage: { default: "of" },
    buttonsPagination: { type: Boolean, default: !0 },
    hidePaginationInfo: { type: Boolean },
    sortBy: { default: "" },
    sortType: { default: "asc" },
    multiSort: { type: Boolean, default: !1 },
    mustSort: { type: Boolean, default: !0 },
    filterOptions: { default: null },
    searchField: { default: "" },
    searchValue: { default: "" },
    serverOptions: { default: null },
    serverItemsLength: { default: 0 },
    theme: { default: () => ({ color: "indigo", variant: "DEFAULT" }) },
    alternating: { type: Boolean, default: !0 },
    noHover: { type: Boolean, default: !1 },
    borderCell: { type: Boolean, default: !1 },
    tableHeight: { default: null },
    tableMinHeight: { default: 180 },
    tableClassName: { default: "" },
    checkboxColumnWidth: { default: null },
    expandColumnWidth: { default: 36 },
    indexColumnWidth: { default: 60 },
    showIndex: { type: Boolean, default: !1 },
    showIndexSymbol: { default: "#" },
    fixedExpand: { type: Boolean, default: !1 },
    fixedHeader: { type: Boolean, default: !0 },
    fixedCheckbox: { type: Boolean, default: !1 },
    fixedIndex: { type: Boolean, default: !1 },
    headerTextDirection: { default: "left" },
    bodyTextDirection: { default: "left" },
    headerClassName: { default: "" },
    headerItemClassName: { type: [Function, String], default: "" },
    bodyRowClassName: { type: [Function, String], default: "" },
    bodyExpandRowClassName: { type: [Function, String], default: "" },
    bodyItemClassName: { type: [Function, String], default: "" },
    hideHeader: { type: Boolean, default: !1 },
    itemsSelected: { default: null },
    loading: { type: Boolean, default: !1 },
    emptyMessage: { default: "No Available Data" },
    clickEventType: { default: "single" },
    clickRowToExpand: { type: Boolean, default: !1 },
    tableNodeId: { default: "" },
    preventContextMenuRow: { type: Boolean, default: !1 },
    expandColumn: { default: "" },
    batchSelectionThreshold: { default: 1e4 }
  },
  emits: [
    "clickRow",
    "contextmenuRow",
    "selectRow",
    "deselectRow",
    "expandRow",
    "updateSort",
    "updateFilter",
    "update:itemsSelected",
    "update:serverOptions",
    "updatePageItems",
    "updateTotalItems",
    "selectAll",
    "updateSelectionStatus"
  ],
  setup(e, { expose: t, emit: r }) {
    const a = e, {
      checkboxColumnWidth: c,
      expandColumnWidth: d,
      indexColumnWidth: v,
      rowsItems: o,
      preventContextMenuRow: i,
      showIndexSymbol: l,
      currentPage: s,
      filterOptions: m,
      headers: w,
      itemsSelected: k,
      loading: S,
      items: C,
      rowsPerPage: B,
      searchField: R,
      searchValue: F,
      serverItemsLength: q,
      showIndex: E,
      sortBy: xe,
      sortType: me,
      serverOptions: ae,
      multiSort: re,
      mustSort: we,
      clickEventType: z,
      fixedExpand: ke,
      fixedCheckbox: I,
      fixedIndex: O,
      batchSelectionThreshold: T
    } = Dt(a), f = b(() => mr(a.theme));
    at("themeClasses", f);
    const y = jt(), P = b(() => !!y.pagination), A = b(() => !!y.loading), J = b(() => !!y.expand), se = b(() => !!y.body), Ae = b(() => !!(y.paginationInfo || y["pagination-info"])), Pe = G(null), Ce = G(null);
    at("dataTable", Pe);
    const _e = G(!1);
    ft(() => {
      if (Ce.value) {
        const u = Ce.value;
        u.addEventListener("scroll", () => {
          _e.value = u.scrollLeft > 0;
        });
      }
    });
    const j = r, Fe = b(() => k.value !== null), ie = b(() => ae.value !== null), {
      serverOptionsComputed: Te,
      updateServerOptionsPage: yt,
      updateServerOptionsSort: bt,
      updateServerOptionsRowsPerPage: xt
    } = tr(
      ae,
      re,
      j
    ), {
      clientSortOptions: Ge,
      headerColumns: Ve,
      headersForRender: ue,
      updateSortField: wt,
      isMultiSorting: kt,
      getMultiSortNumber: Pt
    } = Ka(
      l,
      c,
      d,
      I,
      ke,
      O,
      w,
      J,
      v,
      Fe,
      ie,
      we,
      Te,
      E,
      xe,
      me,
      re,
      bt,
      j
    ), {
      rowsItemsComputed: Je,
      rowsPerPageRef: ne,
      updateRowsPerPage: Ct
    } = er(
      ie,
      o,
      ae,
      B
    ), {
      totalItems: Ye,
      selectItemsComputed: _t,
      totalItemsLength: Se,
      toggleSelectAll: St,
      toggleSelectItem: It,
      isProcessing: $t,
      processProgress: Bt
    } = ir(
      Ge,
      m,
      ie,
      C,
      k,
      R,
      F,
      q,
      re,
      T,
      j
    ), {
      currentPaginationNumber: Y,
      maxPaginationNumber: Ie,
      isLastPage: ce,
      isFirstPage: de,
      nextPage: fe,
      prevPage: ge,
      updatePage: $e,
      updateCurrentPaginationNumber: At
    } = Xa(
      s,
      ie,
      S,
      Se,
      ne,
      ae,
      yt
    ), {
      currentPageFirstIndex: Ee,
      currentPageLastIndex: Oe,
      multipleSelectStatus: Ze,
      pageItems: ve
    } = Qa(
      Y,
      Fe,
      ie,
      C,
      ne,
      _t,
      E,
      Ye,
      Se
    ), Z = b(() => Y.value === 0 ? 0 : (Y.value - 1) * ne.value), {
      expandingItemIndexList: Ne,
      updateExpandingItemIndexList: Me,
      clearExpandingItemIndexList: Qe
    } = Wa(
      ve,
      Z,
      j
    ), {
      fixedHeaders: Xe,
      lastFixedColumn: Nt,
      fixedColumnsInfos: Mt
    } = Ua(
      ue
    ), {
      clickRow: et
    } = za(
      z,
      Fe,
      E,
      j
    ), Rt = (u, M) => {
      i.value && M.preventDefault(), j("contextmenuRow", u, M);
    }, Lt = (u) => {
      const M = u.width ?? (Xe.value.length ? 100 : null);
      if (M) return `width: ${M}px; min-width: ${M}px;`;
    }, tt = (u, M = "th") => {
      if (!Xe.value.length) return;
      const g = Mt.value.find((N) => N.value === u);
      if (g)
        return `
            left: ${g.distance}px;
            z-index: ${M === "th" ? 3 : 1};
            position: sticky;
            background-color: ${M === "th" ? "none" : "inherit"};
        `;
    };
    return oe(S, (u, M) => {
      Te.value && u === !1 && M === !0 && (At(Te.value.page), Qe());
    }), oe(ne, (u) => {
      ie.value ? xt(u) : $e(1);
    }), oe([F, m], () => {
      ie.value || $e(1);
    }), oe([Y, Ge, R, F, m], () => {
      Qe();
    }, { deep: !0 }), oe(ve, (u) => {
      j("updatePageItems", u);
    }, { deep: !0 }), oe(Ye, (u) => {
      j("updateTotalItems", u);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Ee,
      currentPageLastIndex: Oe,
      clientItemsLength: Se,
      maxPaginationNumber: Ie,
      currentPaginationNumber: Y,
      isLastPage: ce,
      isFirstPage: de,
      nextPage: fe,
      prevPage: ge,
      updatePage: $e,
      rowsPerPageOptions: Je,
      rowsPerPageActiveOption: ne,
      updateRowsPerPageActiveOption: Ct
    }), (u, M) => (p(), h("div", {
      ref_key: "dataTable",
      ref: Pe,
      class: _(["relative w-full", [u.tableClassName]])
    }, [
      x("div", {
        ref_key: "tableBody",
        ref: Ce,
        class: _(["relative overflow-auto", {
          "border border-gray-200": !0,
          "min-h-[180px]": !0,
          "shadow-sm": _e.value
        }]),
        style: te([u.tableHeight ? `height: ${u.tableHeight}px` : "", u.tableMinHeight ? `min-height: ${u.tableMinHeight}px` : ""])
      }, [
        x("table", {
          id: u.tableNodeId,
          class: "w-full border-collapse bg-white"
        }, [
          x("colgroup", null, [
            (p(!0), h(ee, null, he(n(ue), (g, N) => (p(), h("col", {
              key: N,
              style: te(Lt(g))
            }, null, 4))), 128))
          ]),
          n(y)["customize-headers"] ? L(u.$slots, "customize-headers", { key: 0 }) : n(ue).length && !u.hideHeader ? (p(), h("thead", {
            key: 1,
            class: _([
              "text-sm text-slate-700 uppercase bg-gray-100 text-nowrap",
              u.headerClassName,
              { "sticky top-0 z-10": u.fixedHeader }
            ])
          }, [
            x("tr", {
              class: _([{ "divide-x divide-gray-200": u.borderCell }])
            }, [
              (p(!0), h(ee, null, he(n(ue), (g, N) => (p(), h("th", {
                key: N,
                style: te(tt(g.value)),
                class: _(["px-4 py-3 font-semibold tracking-wider group", [
                  {
                    "cursor-pointer hover:bg-gray-200": g.sortable,
                    "bg-gray-100": g.sortable && g.sortType === "none" && u.headerClassName === "" && u.headerClassName === "",
                    "bg-gray-200": (g.sortable && g.sortType === "desc" || g.sortType === "asc") && u.headerClassName === "",
                    "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": g.value === n(Nt)
                  },
                  typeof u.headerItemClassName == "string" ? u.headerItemClassName : u.headerItemClassName(g, N + 1),
                  `text-${u.headerTextDirection}`
                ]]),
                onClick: ($) => g.sortable && g.sortType ? n(wt)(g.value, g.sortType) : null
              }, [
                g.text === "checkbox" && n(k) !== null ? (p(), X(Vt, {
                  key: n(Ze),
                  status: n(Ze),
                  onChange: n(St)
                }, null, 8, ["status", "onChange"])) : (p(), h("div", wr, [
                  n(y)[`header-${g.value}`] ? L(u.$slots, `header-${g.value}`, W({
                    key: 0,
                    ref_for: !0
                  }, g)) : n(y)[`header-${g.value.toLowerCase()}`] ? L(u.$slots, `header-${g.value.toLowerCase()}`, W({
                    key: 1,
                    ref_for: !0
                  }, g)) : n(y).header ? L(u.$slots, "header", W({
                    key: 2,
                    ref_for: !0
                  }, g)) : (p(), h("span", kr, D(g.text), 1)),
                  g.sortable ? (p(), h("span", {
                    key: g.sortType ? g.sortType : "none",
                    class: _(["inline-flex transition-opacity duration-200", [g.sortType === "none" ? "opacity-0" : "opacity-100", "group-hover:opacity-100"]])
                  }, [
                    K(n(Ba), {
                      class: _({ "transform rotate-180": g.sortType === "desc" })
                    }, null, 8, ["class"])
                  ], 2)) : H("", !0),
                  n(re) && n(kt)(g.value) ? (p(), h("span", Pr, D(n(Pt)(g.value)), 1)) : H("", !0)
                ]))
              ], 14, xr))), 128))
            ], 2)
          ], 2)) : H("", !0),
          se.value ? L(u.$slots, "body", Be(W({ key: 2 }, n(ve)))) : n(Ve).length ? (p(), h("tbody", Cr, [
            L(u.$slots, "body-prepend", Be(rt({
              items: n(ve),
              pagination: {
                isFirstPage: n(de),
                isLastPage: n(ce),
                currentPaginationNumber: n(Y),
                maxPaginationNumber: n(Ie),
                nextPage: n(fe),
                prevPage: n(ge)
              },
              headers: n(ue)
            }))),
            (p(!0), h(ee, null, he(n(ve), (g, N) => (p(), h(ee, {
              key: g.key || N
            }, [
              x("tr", {
                class: _(["transition-colors bg-white", [
                  { "even:bg-gray-50 odd:bg-white": u.alternating },
                  !u.noHover && "hover:bg-gray-100",
                  typeof u.bodyRowClassName == "string" ? u.bodyRowClassName : u.bodyRowClassName(g, N + 1),
                  { "divide-x divide-gray-200": u.borderCell }
                ]]),
                onClick: ($) => {
                  n(et)(g, "single", $), u.clickRowToExpand && n(Me)(N + Z.value, g, $);
                },
                onDblclick: ($) => n(et)(g, "double", $),
                onContextmenu: ($) => Rt(g, $)
              }, [
                (p(!0), h(ee, null, he(n(Ve), ($, Ft) => (p(), h("td", {
                  key: Ft,
                  style: te(tt($, "td")),
                  class: _(["px-4 py-2", [
                    {
                      "cursor-pointer": $ === "expand" && u.expandColumn === ""
                    },
                    typeof u.bodyItemClassName == "string" ? u.bodyItemClassName : u.bodyItemClassName($, N + 1),
                    `text-${u.bodyTextDirection}`
                  ]]),
                  onClick: (ye) => $ === "expand" && u.expandColumn === "" ? n(Me)(N + Z.value, g, ye) : null
                }, [
                  n(y)[`item-${$}`] ? L(u.$slots, `item-${$}`, W({
                    key: 0,
                    ref_for: !0
                  }, g)) : n(y)[`item-${$.toLowerCase()}`] ? L(u.$slots, `item-${$.toLowerCase()}`, W({
                    key: 1,
                    ref_for: !0
                  }, g)) : $ === u.expandColumn ? L(u.$slots, "expand-button", {
                    key: 2,
                    item: g,
                    expanded: n(Ne).includes(Z.value + N),
                    toggle: (ye) => n(Me)(N + Z.value, g, ye)
                  }, () => [
                    x("button", {
                      onClick: dt((ye) => n(Me)(N + Z.value, g, ye), ["stop"]),
                      class: "inline-flex items-center"
                    }, [
                      K(n(wa), {
                        class: _({ "transform -rotate-90": n(Ne).includes(Z.value + N) })
                      }, null, 8, ["class"])
                    ], 8, Ir)
                  ]) : $ === "expand" && u.expandColumn === "" ? (p(), X(n(_a), {
                    key: 3,
                    class: _({ "transform rotate-90": n(Ne).includes(Z.value + N) })
                  }, null, 8, ["class"])) : $ === "checkbox" ? (p(), X(vt, {
                    key: 4,
                    checked: g[$],
                    onChange: (ye) => n(It)(g)
                  }, null, 8, ["checked", "onChange"])) : n(y).item ? L(u.$slots, "item", W({
                    key: 5,
                    ref_for: !0
                  }, { column: $, item: g })) : (p(), h(ee, { key: 6 }, [
                    De(D(n(or)($, g)), 1)
                  ], 64))
                ], 14, Sr))), 128))
              ], 42, _r),
              J.value && n(Ne).includes(N + Z.value) ? (p(), h("tr", {
                key: 0,
                class: _([
                  { "bg-gray-50": (N + 1) % 2 === 0 },
                  typeof u.bodyExpandRowClassName == "string" ? u.bodyExpandRowClassName : u.bodyExpandRowClassName(g, N + 1)
                ])
              }, [
                x("td", {
                  colspan: n(ue).length,
                  class: "px-4 py-2"
                }, [
                  g.expandLoading ? (p(), X(la, {
                    key: 0,
                    class: "mb-4"
                  })) : H("", !0),
                  L(u.$slots, "expand", W({ ref_for: !0 }, g))
                ], 8, $r)
              ], 2)) : H("", !0)
            ], 64))), 128)),
            L(u.$slots, "body-append", Be(rt({
              items: n(ve),
              pagination: {
                isFirstPage: n(de),
                isLastPage: n(ce),
                currentPaginationNumber: n(Y),
                maxPaginationNumber: n(Ie),
                nextPage: n(fe),
                prevPage: n(ge),
                updatePage: n($e)
              },
              headers: n(ue)
            })))
          ])) : H("", !0)
        ], 8, br),
        n(S) ? (p(), h("div", Br, [
          x("div", Ar, [
            A.value ? L(u.$slots, "loading", { key: 0 }) : (p(), X(sa, { key: 1 }))
          ])
        ])) : H("", !0),
        !n(ve).length && !n(S) ? (p(), h("div", Nr, [
          L(u.$slots, "empty-message", {}, () => [
            De(D(u.emptyMessage), 1)
          ])
        ])) : H("", !0)
      ], 6),
      u.hideFooter ? H("", !0) : (p(), h("div", {
        key: 0,
        class: _(["flex items-center justify-between px-4 py-3 bg-white", {
          "border border-gray-200 border-t-0": !0,
          "shadow-sm": _e.value
        }])
      }, [
        x("div", Mr, [
          x("button", {
            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: M[0] || (M[0] = //@ts-ignore
            (...g) => n(ge) && n(ge)(...g)),
            disabled: n(de)
          }, [
            K(n(ht), {
              class: _({ "opacity-50": n(de) })
            }, null, 8, ["class"])
          ], 8, Rr),
          x("button", {
            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: M[1] || (M[1] = //@ts-ignore
            (...g) => n(fe) && n(fe)(...g)),
            disabled: n(ce)
          }, [
            K(n(pt), {
              class: _({ "opacity-50": n(ce) })
            }, null, 8, ["class"])
          ], 8, Lr)
        ]),
        x("div", Fr, [
          u.hideRowsPerPage ? H("", !0) : (p(), h("div", Tr, [
            De(D(u.rowsPerPageMessage) + " ", 1),
            K(ta, {
              modelValue: n(ne),
              "onUpdate:modelValue": M[2] || (M[2] = (g) => qt(ne) ? ne.value = g : null),
              "rows-items": n(Je)
            }, null, 8, ["modelValue", "rows-items"])
          ])),
          u.hidePaginationInfo ? H("", !0) : (p(), h("div", Er, [
            Ae.value ? L(u.$slots, "pagination-info", Be(W({ key: 0 }, {
              currentPageFirstIndex: n(Ee),
              currentPageLastIndex: n(Oe),
              totalItemsLength: n(Se),
              rowsOfPageSeparatorMessage: u.rowsOfPageSeparatorMessage
            }))) : (p(), h("span", Or, D(`${n(Ee)}–${n(Oe)}`) + " " + D(u.rowsOfPageSeparatorMessage) + " " + D(n(Se)), 1))
          ])),
          P.value ? L(u.$slots, "pagination", Be(W({ key: 2 }, {
            isFirstPage: n(de),
            isLastPage: n(ce),
            currentPaginationNumber: n(Y),
            maxPaginationNumber: n(Ie),
            nextPage: n(fe),
            prevPage: n(ge)
          }))) : (p(), X(Ta, {
            key: 3,
            "is-first-page": n(de),
            "is-last-page": n(ce),
            onClickNextPage: n(fe),
            onClickPrevPage: n(ge)
          }, zt({ _: 2 }, [
            u.buttonsPagination ? {
              name: "buttonsPagination",
              fn: gt(() => [
                K(Ma, {
                  "current-pagination-number": n(Y),
                  "max-pagination-number": n(Ie),
                  onUpdatePage: n($e)
                }, null, 8, ["current-pagination-number", "max-pagination-number", "onUpdatePage"])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["is-first-page", "is-last-page", "onClickNextPage", "onClickPrevPage"]))
        ])
      ], 2)),
      We(K(qa, { progress: n(Bt) }, null, 8, ["progress"]), [
        [Ue, n($t)]
      ])
    ], 2));
  }
}), Hr = (e) => {
  e.component("DataTable", mt);
};
mt.install = Hr;
export {
  qr as createFilter,
  mt as default,
  Hr as install
};
