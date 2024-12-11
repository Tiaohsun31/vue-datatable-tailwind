var Tt = Object.defineProperty;
var Et = (e, t, r) => t in e ? Tt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Oe = (e, t, r) => Et(e, typeof t != "symbol" ? t + "" : t, r);
import { defineComponent as V, computed as b, inject as xe, openBlock as p, createElementBlock as m, withModifiers as dt, createElementVNode as w, normalizeClass as _, normalizeStyle as oe, unref as o, withDirectives as ze, vShow as We, createBlock as X, ref as G, watch as ne, onMounted as ft, onBeforeUnmount as Ot, toDisplayString as j, createVNode as K, Transition as Dt, withCtx as gt, Fragment as ee, renderList as he, createCommentVNode as D, renderSlot as L, onUnmounted as jt, toRefs as Ht, provide as at, useSlots as qt, mergeProps as W, normalizeProps as $e, guardReactiveProps as rt, createTextVNode as De, isRef as zt, createSlots as Wt } from "vue";
const Ut = ["checked", "aria-checked"], Kt = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Gt = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Vt = /* @__PURE__ */ V({
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
    const t = e, r = b(() => t.checked), a = b(() => t.partial), u = xe("themeClasses");
    return (d, g) => (p(), m("div", {
      class: "relative inline-flex items-center justify-center h-5 w-5 cursor-pointer group",
      onClick: g[0] || (g[0] = dt((n) => d.$emit("change"), ["stop", "prevent"]))
    }, [
      w("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: r.value,
        "aria-checked": r.value
      }, null, 8, Ut),
      w("div", {
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
        style: oe(o(u).style)
      }, [
        ze((p(), m("svg", Kt, g[1] || (g[1] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [We, r.value && !a.value]
        ]),
        ze((p(), m("svg", Gt, g[2] || (g[2] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [We, a.value]
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
    return (a, u) => (p(), X(Vt, {
      checked: e.checked,
      partial: !1,
      onChange: u[0] || (u[0] = (d) => r("change"))
    }, null, 8, ["checked"]));
  }
}), Jt = /* @__PURE__ */ V({
  __name: "MultipleSelectCheckBox",
  props: {
    status: {
      type: String,
      required: !0
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const r = e, a = b(() => r.status === "allSelected"), u = b(() => r.status === "partSelected"), d = t;
    return (g, n) => (p(), X(vt, {
      checked: a.value,
      partial: u.value,
      onChange: n[0] || (n[0] = (i) => d("change", !a.value))
    }, null, 8, ["checked", "partial"]));
  }
}), Yt = { class: "relative inline-block min-w-[70px]" }, Zt = ["aria-expanded"], Qt = { class: "block truncate" }, Xt = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, ea = ["aria-selected", "onClick"], ta = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, aa = /* @__PURE__ */ V({
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
    const r = e, a = t, u = G(!1), d = G(!1), g = b({
      get: () => r.modelValue,
      set: (x) => a("update:modelValue", x)
    }), n = xe("dataTable");
    ne(u, (x) => {
      if (x && (n != null && n.value)) {
        const k = window.innerHeight, S = n.value.getBoundingClientRect(), C = k - (S.height + S.top);
        d.value = C <= 100;
      }
    });
    const i = (x) => {
      g.value = x, u.value = !1;
    }, l = () => {
      u.value = !u.value;
    }, s = (x) => {
      x.target.closest(".relative") || (u.value = !1);
    }, h = (x) => {
      const k = x.relatedTarget;
      k != null && k.closest(".relative") || (u.value = !1);
    };
    return ft(() => {
      document.addEventListener("click", s);
    }), Ot(() => {
      document.removeEventListener("click", s);
    }), (x, k) => (p(), m("div", Yt, [
      w("button", {
        type: "button",
        class: _(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          u.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
        ]]),
        onClick: l,
        "aria-haspopup": "listbox",
        "aria-expanded": u.value
      }, [
        w("span", Qt, j(g.value), 1),
        w("span", Xt, [
          (p(), m("svg", {
            class: _(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": u.value }]),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, k[0] || (k[0] = [
            w("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 9l-7 7-7-7"
            }, null, -1)
          ]), 2))
        ])
      ], 10, Zt),
      K(Dt, {
        "enter-active-class": "transition duration-100 ease-out",
        "enter-from-class": "transform scale-95 opacity-0",
        "enter-to-class": "transform scale-100 opacity-100",
        "leave-active-class": "transition duration-75 ease-in",
        "leave-from-class": "transform scale-100 opacity-100",
        "leave-to-class": "transform scale-95 opacity-0"
      }, {
        default: gt(() => [
          u.value ? (p(), m("ul", {
            key: 0,
            class: _(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": d.value }]),
            tabindex: "-1",
            role: "listbox",
            onFocusout: h
          }, [
            (p(!0), m(ee, null, he(e.rowsItems, (S) => (p(), m("li", {
              key: S,
              class: _(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                S === g.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
              ]]),
              role: "option",
              "aria-selected": S === g.value,
              onClick: (C) => i(S)
            }, [
              w("span", {
                class: _(["block", { "font-medium": S === g.value }])
              }, j(S), 3),
              S === g.value ? (p(), m("span", ta, k[1] || (k[1] = [
                w("svg", {
                  class: "h-4 w-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor"
                }, [
                  w("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5 13l4 4L19 7"
                  })
                ], -1)
              ]))) : D("", !0)
            ], 10, ea))), 128))
          ], 34)) : D("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), ra = { class: "inline-flex relative w-[60px] h-[60px]" }, sa = /* @__PURE__ */ V({
  __name: "Loading",
  setup(e) {
    const t = xe("themeClasses");
    return (r, a) => (p(), m("div", ra, [
      (p(), m(ee, null, he(4, (u) => w("div", {
        key: u,
        class: _(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(u - 1) * 150}`]]),
        style: oe({
          borderTopColor: o(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), le = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [a, u] of t)
    r[a] = u;
  return r;
}, na = /* @__PURE__ */ le(sa, [["__scopeId", "data-v-e9a27991"]]), oa = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, la = /* @__PURE__ */ V({
  __name: "LoadingLine",
  setup(e) {
    const t = xe("themeClasses");
    return (r, a) => (p(), m("div", oa, [
      w("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: oe({ backgroundColor: o(t).hex })
      }, null, 4)
    ]));
  }
}), ia = /* @__PURE__ */ le(la, [["__scopeId", "data-v-cbdc3562"]]), ua = {}, ca = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function da(e, t) {
  return p(), m("svg", ca, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const pt = /* @__PURE__ */ le(ua, [["render", da]]), fa = {}, ga = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function va(e, t) {
  return p(), m("svg", ga, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const ht = /* @__PURE__ */ le(fa, [["render", va]]), pa = {}, ha = { class: "px-3 py-1.5" };
function ma(e, t) {
  return p(), m("span", ha, t[0] || (t[0] = [
    w("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      w("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const ya = /* @__PURE__ */ le(pa, [["render", ma]]), ba = {}, xa = {
  class: "w-4 h-4 transition-transform duration-200",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function wa(e, t) {
  return p(), m("svg", xa, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const ka = /* @__PURE__ */ le(ba, [["render", wa]]), Pa = {}, Ca = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function _a(e, t) {
  return p(), m("svg", Ca, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Sa = /* @__PURE__ */ le(Pa, [["render", _a]]), Ia = {}, $a = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ba(e, t) {
  return p(), m("svg", $a, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Aa = /* @__PURE__ */ le(Ia, [["render", Ba]]), Na = {
  class: "inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Ma = ["onClick"], pe = 7, Ra = /* @__PURE__ */ V({
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
    const r = e, a = t, u = xe("themeClasses"), d = (n) => {
      n.type === "button" && !n.active && a("updatePage", n.page);
    }, g = b(() => {
      const n = [], { maxPaginationNumber: i, currentPaginationNumber: l } = r;
      if (i <= pe) {
        for (let s = 1; s <= i; s += 1)
          n.push({
            type: "button",
            page: s,
            active: s === l,
            activePrev: s + 1 === l
          });
        return n;
      }
      if ([1, 2, i, i - 1].includes(l))
        for (let s = 1; s <= pe; s += 1)
          if (s <= 3)
            n.push({
              type: "button",
              page: s,
              active: s === l,
              activePrev: s + 1 === l
            });
          else if (s === 4)
            n.push({ type: "omission" });
          else {
            const h = i - (pe - s);
            n.push({
              type: "button",
              page: h,
              active: h === l,
              activePrev: h + 1 === l
            });
          }
      else if ([3, 4].includes(l))
        for (let s = 1; s <= pe; s += 1)
          s <= 5 ? n.push({
            type: "button",
            page: s,
            active: s === l,
            activePrev: s + 1 === l
          }) : s === 6 ? n.push({ type: "omission" }) : n.push({
            type: "button",
            page: i,
            active: i === l,
            activePrev: !1
          });
      else if ([i - 2, i - 3].includes(l))
        for (let s = 1; s <= pe; s += 1)
          if (s === 1)
            n.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (s === 2)
            n.push({ type: "omission" });
          else {
            const h = i - (pe - s);
            n.push({
              type: "button",
              page: h,
              active: h === l,
              activePrev: h + 1 === l
            });
          }
      else
        for (let s = 1; s <= pe; s += 1)
          if (s === 1)
            n.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (s === 2 || s === 6)
            n.push({ type: "omission" });
          else if (s === 7)
            n.push({
              type: "button",
              page: i,
              active: i === l,
              activePrev: !1
            });
          else {
            const h = 4 - s, x = l - h;
            n.push({
              type: "button",
              page: x,
              active: x === l,
              activePrev: x + 1 === l
            });
          }
      return n;
    });
    return (n, i) => (p(), m("div", Na, [
      (p(!0), m(ee, null, he(g.value, (l, s) => (p(), m("div", {
        key: s,
        class: _(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          s === 0 && "rounded-l-md",
          // Last item styles
          s === g.value.length - 1 && "rounded-r-md",
          // Button specific styles
          l.type === "button" && [
            "border border-gray-300",
            // Active state
            l.active ? [
              "z-10",
              o(u).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${o(u).tailwindName}-500`,
              `focus:border-${o(u).tailwindName}-500`
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
        style: oe(o(u).style),
        onClick: (h) => d(l)
      }, [
        l.type === "button" ? (p(), m("span", {
          key: 0,
          class: _(["px-3 py-1.5", { "font-medium": l.active }])
        }, j(l.page), 3)) : (p(), X(o(ya), { key: 1 }))
      ], 14, Ma))), 128))
    ]));
  }
}), La = {
  class: "flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Fa = ["disabled"], Ta = ["disabled"], Ea = /* @__PURE__ */ V({
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
    return (a, u) => (p(), m("div", La, [
      w("button", {
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
        onClick: u[0] || (u[0] = (d) => r("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        K(o(ht), {
          class: _({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Fa),
      L(a.$slots, "buttonsPagination"),
      w("button", {
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
        onClick: u[1] || (u[1] = (d) => r("clickNextPage")),
        "aria-label": "Next page"
      }, [
        K(o(pt), {
          class: _({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Ta)
    ]));
  }
}), Oa = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, Da = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, ja = { class: "w-64" }, Ha = { class: "h-2 bg-gray-200 rounded" }, qa = { class: "text-center text-sm text-gray-600" }, za = /* @__PURE__ */ V({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = xe("themeClasses");
    return (r, a) => (p(), m("div", Oa, [
      w("div", Da, [
        a[0] || (a[0] = w("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        w("div", ja, [
          w("div", Ha, [
            w("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: oe({ width: `${r.progress}%`, backgroundColor: o(t).hex })
            }, null, 4)
          ])
        ]),
        w("div", qa, j(Math.round(r.progress)) + "% ", 1)
      ])
    ]));
  }
});
function Wa(e, t, r, a) {
  return {
    clickRow: (d, g, n) => {
      if (e.value !== g) return;
      const i = { ...d };
      if (t.value) {
        const { checkbox: l } = d;
        delete i.checkbox, i.isSelected = l;
      }
      if (r.value) {
        const { index: l } = d;
        delete i.index, i.indexInCurrentPage = l;
      }
      a("clickRow", i, n);
    }
  };
}
function Ua(e, t, r) {
  const a = G([]);
  return {
    expandingItemIndexList: a,
    // 展開項的索引列表
    updateExpandingItemIndexList: (g, n, i) => {
      i.stopPropagation();
      const l = a.value.indexOf(g);
      if (l !== -1)
        a.value.splice(l, 1);
      else {
        const s = e.value.findIndex((h) => JSON.stringify(h) === JSON.stringify(n));
        r("expandRow", t.value + s, n), a.value.push(t.value + s);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      a.value = [];
    }
    // 清空展開列表的方法
  };
}
function Ka(e, t) {
  const r = b(() => e.value.filter((n) => n.fixed)), a = b(() => r.value.length ? r.value[r.value.length - 1].value : ""), u = b(() => {
    if (!r.value.length) return [];
    const n = r.value.map((i) => i.width ?? 100);
    return r.value.map((i, l) => ({
      value: i.value,
      // 列標籤
      fixed: i.fixed ?? !0,
      // 是否固定
      width: i.width ?? 100,
      // 列寬度
      // 計算距離左側的距離
      distance: l === 0 ? 0 : n.reduce((s, h, x) => x < l ? s + h : s, 0)
    }));
  }), d = G(!1);
  let g = null;
  return ft(() => {
    const n = t.value;
    if (n) {
      const i = () => {
        d.value = n.scrollLeft > 0;
      };
      i(), n.addEventListener("scroll", i), g = () => {
        n.removeEventListener("scroll", i);
      };
    }
  }), jt(() => {
    g && (g(), g = null);
  }), {
    fixedHeaders: r,
    lastFixedColumn: a,
    fixedColumnsInfos: u,
    showShadow: d
  };
}
function Ga(e, t, r, a, u, d, g, n, i, l, s, h, x, k, S, C, B, R, F) {
  const H = b(() => g.value.length ? {
    hasFixedColumns: g.value.some((I) => I.fixed),
    fixedHeaders: g.value.filter((I) => I.fixed),
    unFixedHeaders: g.value.filter((I) => !I.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), E = G(
    Va(S.value, C.value, B.value)
  ), { determineHeaderSortState: we } = Za(s, x, B, E), me = b(() => {
    const { fixedHeaders: I, unFixedHeaders: O } = H.value, T = [...I, ...O].map((f) => ({
      ...f,
      sortType: f.sortable ? we(f.value) : void 0
    }));
    return [
      ...Object.values(te.value).filter(Boolean),
      ...T
    ];
  }), te = b(() => ({
    checkbox: l.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: a.value || H.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: k.value && {
      text: e.value,
      value: "index",
      fixed: d.value || H.value.hasFixedColumns,
      width: i.value
    },
    expand: n.value && {
      text: "",
      value: "expand",
      fixed: u.value || H.value.hasFixedColumns,
      width: r.value
    }
  })), ae = b(
    () => me.value.map((I) => I.value)
  ), ke = (I, O) => {
    const T = O === "none" ? "asc" : O === "asc" ? "desc" : h.value ? "asc" : null;
    if (s.value) {
      R(I, T);
      return;
    }
    const f = B.value ? Ja(I, T, E.value) : Ya(I, T);
    E.value = f, F("updateSort", { sortType: T, sortBy: I });
  }, q = b(() => (I) => {
    var T, f;
    const O = s.value ? (T = x.value) == null ? void 0 : T.sortBy : (f = E.value) == null ? void 0 : f.sortBy;
    return Array.isArray(O) && O.includes(I);
  }), Pe = b(() => (I) => {
    var T, f;
    const O = s.value ? (T = x.value) == null ? void 0 : T.sortBy : (f = E.value) == null ? void 0 : f.sortBy;
    return Array.isArray(O) ? O.indexOf(I) + 1 : !1;
  });
  return {
    clientSortOptions: E,
    headerColumns: ae,
    headersForRender: me,
    updateSortField: ke,
    isMultiSorting: q,
    getMultiSortNumber: Pe
  };
}
function Va(e, t, r) {
  return r && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((a) => a === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const Ja = (e, t, r) => {
  if (!(r != null && r.sortBy) || !Array.isArray(r.sortBy) || !Array.isArray(r.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const a = r.sortBy.indexOf(e), u = [...r.sortBy], d = [...r.sortDesc];
  return a === -1 && t !== null ? (u.push(e), d.push(t === "desc")) : t === null ? (u.splice(a, 1), d.splice(a, 1)) : d[a] = t === "desc", { sortBy: u, sortDesc: d };
}, Ya = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function Za(e, t, r, a) {
  const u = (n) => !e.value || !t.value ? d(n) : g(n), d = (n) => {
    if (!a.value) return "none";
    const { sortBy: i, sortDesc: l } = a.value;
    if (r.value && Array.isArray(i) && Array.isArray(l)) {
      const s = i.indexOf(n);
      return s !== -1 ? l[s] ? "desc" : "asc" : "none";
    }
    return n === i ? l ? "desc" : "asc" : "none";
  }, g = (n) => {
    const { sortBy: i, sortType: l } = t.value;
    if (r.value && Array.isArray(i) && Array.isArray(l)) {
      const s = i.indexOf(n);
      return s !== -1 ? l[s] : "none";
    }
    return n === i && l ? l : "none";
  };
  return {
    determineHeaderSortState: u
  };
}
class Qa {
  constructor() {
    Oe(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    Oe(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let r = this.itemKeyCache.get(t);
    if (!r) {
      const { checkbox: a, index: u, ...d } = t;
      r = Object.entries(d).sort(([g], [n]) => g.localeCompare(n)).map(([g, n]) => `${g}:${n}`).join("|"), this.itemKeyCache.set(t, r);
    }
    return r;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function Xa(e, t, r, a, u, d, g, n, i) {
  const l = new Qa(), s = b(
    () => (e.value - 1) * u.value + 1
  ), h = b(() => r.value ? Math.min(
    i.value,
    e.value * u.value
  ) : Math.min(
    n.value.length,
    e.value * u.value
  )), x = b(() => r.value ? a.value : n.value.slice(
    s.value - 1,
    h.value
  )), k = b(() => g.value ? x.value.map((B, R) => ({
    index: s.value + R,
    ...B
  })) : x.value), S = b(() => d.value.length === 0 || !d.value.some(
    (R) => n.value.some(
      (F) => l.getItemKey(R) === l.getItemKey(F)
    )
  ) ? "noneSelected" : d.value.length === n.value.length && d.value.every(
    (F) => n.value.some(
      (H) => l.getItemKey(F) === l.getItemKey(H)
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
    currentPageLastIndex: h,
    multipleSelectStatus: S,
    pageItems: C
  };
}
function er(e, t, r, a, u, d, g) {
  const n = G(d.value ? d.value.page : e.value), i = b(() => Math.ceil(a.value / u.value)), l = b(() => i.value === 0 || n.value === i.value), s = b(() => n.value === 1);
  return {
    currentPaginationNumber: n,
    maxPaginationNumber: i,
    isLastPage: l,
    isFirstPage: s,
    nextPage: () => {
      if (a.value !== 0 && !l.value && !r.value)
        if (t.value) {
          const C = n.value + 1;
          g(C);
        } else
          n.value += 1;
    },
    prevPage: () => {
      if (a.value !== 0 && !s.value && !r.value)
        if (t.value) {
          const C = n.value - 1;
          g(C);
        } else
          n.value -= 1;
    },
    updatePage: (C) => {
      r.value || (t.value ? g(C) : n.value = C);
    },
    updateCurrentPaginationNumber: (C) => {
      n.value = C;
    }
  };
}
function tr(e, t, r, a) {
  var n;
  const u = b(() => !e.value && t.value.findIndex((i) => i === a.value) === -1 ? [a.value, ...t.value] : t.value), d = G(((n = r.value) == null ? void 0 : n.rowsPerPage) ?? a.value);
  return {
    rowsItemsComputed: u,
    // 計算後的每頁行數選項
    rowsPerPageRef: d,
    // 每頁行數
    updateRowsPerPage: (i) => {
      d.value = i;
    }
    // 更新每頁行數
  };
}
function ar(e, t, r) {
  const a = b({
    get: () => {
      if (e.value) {
        const { page: n, rowsPerPage: i, sortBy: l, sortType: s } = e.value;
        return { page: n, rowsPerPage: i, sortBy: l ?? null, sortType: s ?? null };
      }
      return null;
    },
    set: (n) => {
      r("update:serverOptions", n);
    }
  });
  return {
    serverOptionsComputed: a,
    updateServerOptionsPage: (n) => {
      a.value && (a.value = {
        ...a.value,
        page: n
      });
    },
    updateServerOptionsSort: (n, i) => {
      if (a.value)
        if (t.value && Array.isArray(a.value.sortBy) && Array.isArray(a.value.sortType)) {
          const l = a.value.sortBy.findIndex((s) => s === n);
          l === -1 && i !== null && (a.value.sortBy.push(n), a.value.sortType.push(i)), i === null ? (a.value.sortBy.splice(l, 1), a.value.sortType.splice(l, 1)) : a.value.sortType[l] = i;
        } else
          a.value = {
            ...a.value,
            sortBy: i !== null ? n : null,
            sortType: i
          };
    },
    updateServerOptionsRowsPerPage: (n) => {
      a.value && (a.value = {
        ...a.value,
        page: 1,
        rowsPerPage: n
      });
    }
  };
}
function rr(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function sr(e) {
  return e.comparison === "in";
}
function nr(e) {
  return typeof e.comparison == "function";
}
function or(e) {
  return typeof e == "number" && !isNaN(e);
}
const zr = {
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
    for (const u of r)
      if (a && typeof a == "object")
        a = a[u];
      else
        return "";
    return a ?? "";
  }
  return t[e] ?? "";
}
function lr(e, t) {
  const r = U(e, t);
  return Array.isArray(r) ? r.join(",") : r;
}
const st = 1e3, nt = /* @__PURE__ */ new WeakMap(), Re = (e) => {
  let t = nt.get(e);
  if (!t) {
    const { checkbox: r, index: a, ...u } = e;
    t = JSON.stringify(u), nt.set(e, t);
  }
  return t;
};
function ir(e, t, r) {
  const a = G({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  ne(t, (l) => {
    if (l === null) {
      a.value.selectedItems.clear(), a.value.itemsMap.clear();
      return;
    }
    const s = /* @__PURE__ */ new Set(), h = /* @__PURE__ */ new Map();
    for (const x of l) {
      const k = Re(x);
      s.add(k), h.set(k, x);
    }
    a.value.selectedItems = s, a.value.itemsMap = h;
  }, { immediate: !0, deep: !0 });
  const u = async (l, s, h) => new Promise((x) => {
    requestAnimationFrame(() => {
      const k = new Set(a.value.selectedItems), S = new Map(a.value.itemsMap);
      for (let C = 0; C < l.length; C++) {
        const B = l[C], R = Re(B);
        s ? (k.add(R), S.set(R, B)) : k.delete(R), a.value.processedCount = h + C + 1, a.value.visualProgress = a.value.processedCount / a.value.totalCount * 100;
      }
      a.value.selectedItems = k, a.value.itemsMap = S, x();
    });
  }), d = async (l) => {
    if (!a.value.selectionInProgress)
      try {
        if (a.value.selectionInProgress = !0, a.value.processedCount = 0, a.value.totalCount = e.value.length, a.value.visualProgress = 0, !l) {
          a.value.selectedItems.clear(), a.value.itemsMap.clear(), r("update:itemsSelected", []), a.value.visualProgress = 100;
          return;
        }
        const s = e.value;
        for (let h = 0; h < s.length; h += st) {
          const x = s.slice(h, Math.min(h + st, s.length));
          await u(x, l, h), await new Promise((k) => setTimeout(k, 0));
        }
        r("update:itemsSelected", n.value), l && r("selectAll");
      } finally {
        a.value.selectionInProgress = !1;
      }
  }, g = (l) => {
    const s = Re(l), h = { ...l };
    delete h.checkbox, delete h.index;
    const x = new Set(a.value.selectedItems), k = new Map(a.value.itemsMap);
    x.has(s) ? (x.delete(s), r("deselectRow", h)) : (x.add(s), k.set(s, h), r("selectRow", h)), a.value.selectedItems = x, a.value.itemsMap = k, r("update:itemsSelected", Array.from(k.values()).filter((C) => x.has(Re(C))));
  }, n = b(() => a.value.selectedItems.size === 0 ? [] : Array.from(a.value.itemsMap.entries()).filter(([l]) => a.value.selectedItems.has(l)).map(([, l]) => l)), i = b(() => a.value.visualProgress);
  return {
    selectedItems: n,
    toggleSelectAll: d,
    toggleSelectItem: g,
    isProcessing: b(() => a.value.selectionInProgress),
    selectionProgress: i
  };
}
function ur(e, t, r, a, u, d, g, n, i, l, s) {
  const h = /* @__PURE__ */ new WeakMap(), x = (f) => {
    let y = h.get(f);
    return y || (typeof d.value == "string" && d.value !== "" ? y = String(U(d.value, f)) : Array.isArray(d.value) ? y = d.value.map((P) => String(U(P, f))).join(" ") : y = Object.values(f).map(String).join(" "), h.set(f, y)), y;
  }, k = b(() => {
    if (!r.value && g.value !== "") {
      const f = new RegExp(g.value, "i");
      return a.value.filter((y) => f.test(x(y)));
    }
    return a.value;
  }), S = (f, y) => {
    const P = or(f) ? f : parseFloat(String(f));
    if (isNaN(P)) return !1;
    if (y.comparison === "between" && Array.isArray(y.criteria)) {
      const [J, re] = y.criteria;
      return P >= J && P <= re;
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
        return nr(P) ? P.comparison(A, P.criteria) : rr(P) ? S(A, P) : sr(P) ? P.criteria.includes(A) : P.comparison === "=" ? A === P.criteria : A !== P.criteria;
      })
    ) : k.value;
  }), B = (f, y, P) => f === y ? 0 : f == null ? 1 : y == null ? -1 : f < y ? P ? 1 : -1 : P ? -1 : 1, R = (f, y, P, A) => A < 0 ? f : R(f, y, P, A - 1).sort((J, re) => {
    if (!y.slice(0, A).every((ye) => U(ye, J) === U(ye, re))) return 0;
    const Ce = y[A], Ae = U(Ce, J), z = U(Ce, re);
    return B(Ae, z, P[A]);
  }), F = b(() => {
    if (r.value) return a.value;
    if (!e.value) return C.value;
    const { sortBy: f, sortDesc: y } = e.value, P = [...C.value];
    return i.value && Array.isArray(f) && Array.isArray(y) ? f.length ? R(P, f, y, f.length - 1) : P : P.sort((A, J) => {
      const re = U(f, A), Be = U(f, J);
      return B(re, Be, y);
    });
  }), H = b(() => r.value ? n.value : F.value.length), E = b(() => r.value ? !1 : (r.value ? n.value : a.value.length) >= l.value), {
    selectedItems: we,
    toggleSelectAll: me,
    toggleSelectItem: te,
    isProcessing: ae,
    selectionProgress: ke
  } = ir(F, u, s), q = b({
    get: () => u.value ?? [],
    set: (f) => {
      s("update:itemsSelected", f);
    }
  }), Pe = (f) => {
    q.value = f ? F.value : [], f && s("selectAll");
  }, I = (f) => {
    const y = f.checkbox;
    if (delete f.checkbox, delete f.index, y)
      q.value = q.value.filter(
        (P) => JSON.stringify(P) !== JSON.stringify(f)
      ), s("deselectRow", f);
    else {
      const P = q.value;
      P.unshift(f), q.value = P, s("selectRow", f);
    }
  };
  return {
    totalItems: F,
    selectItemsComputed: q,
    totalItemsLength: H,
    toggleSelectAll: (f) => {
      if (E.value) {
        s("updateSelectionStatus", !0);
        try {
          me(f), s("update:itemsSelected", f ? Array.from(we.value) : []), f && s("selectAll");
        } finally {
          s("updateSelectionStatus", !1);
        }
      } else
        Pe(f);
    },
    toggleSelectItem: (f) => {
      E.value ? te(f) : I(f);
    },
    isProcessing: b(() => E.value && ae.value),
    processProgress: ke
  };
}
function cr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, He = {}, Le = { exports: {} }, ot;
function dr() {
  if (ot) return Le.exports;
  ot = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Le.exports = t(), Le.exports.createColors = t, Le.exports;
}
var lt;
function fr() {
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
        return g;
      },
      default: function() {
        return n;
      }
    });
    const r = /* @__PURE__ */ a(/* @__PURE__ */ dr());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    let u = /* @__PURE__ */ new Set();
    function d(i, l, s) {
      typeof process < "u" && process.env.JEST_WORKER_ID || s && u.has(s) || (s && u.add(s), console.warn(""), l.forEach((h) => console.warn(i, "-", h)));
    }
    function g(i) {
      return r.default.dim(i);
    }
    const n = {
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
  }(He)), He;
}
var it;
function gr() {
  return it || (it = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const t = /* @__PURE__ */ r(fr());
    function r(d) {
      return d && d.__esModule ? d : {
        default: d
      };
    }
    function a({ version: d, from: g, to: n }) {
      t.default.warn(`${g}-color-renamed`, [
        `As of Tailwind CSS ${d}, \`${g}\` has been renamed to \`${n}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const u = {
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
var qe, ut;
function vr() {
  if (ut) return qe;
  ut = 1;
  let e = gr();
  return qe = (e.__esModule ? e : { default: e }).default, qe;
}
var pr = vr();
const Q = /* @__PURE__ */ cr(pr), Ue = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, hr = (e) => {
  const t = ct(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let r = { color: "indigo", variant: "DEFAULT" }, a = 1 / 0;
  const u = Object.entries(Q).reduce((d, [g, n]) => {
    if (typeof n == "object") {
      const i = g;
      Object.entries(Ue).forEach(([l, s]) => {
        n[s] && (d[n[s]] = { color: i, variant: l });
      });
    }
    return d;
  }, {});
  return Object.entries(u).forEach(([d, g]) => {
    const n = ct(d);
    if (!n) return;
    const i = br(t, n);
    i < a && (a = i, r = g);
  }), r;
}, mr = (e, t) => {
  const r = Ue[t], a = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
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
}, yr = (e) => {
  const { color: t, variant: r = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? hr(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : Q[t][Ue[r]],
    tailwindName: t,
    style: mr(t, r)
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
function br(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const xr = ["id"], wr = ["onClick"], kr = {
  key: 1,
  class: "items-center gap-2"
}, Pr = {
  key: 3,
  class: "header-text"
}, Cr = {
  key: 5,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, _r = {
  key: 3,
  class: "text-sm divide-y divide-gray-200"
}, Sr = ["onClick", "onDblclick", "onContextmenu"], Ir = ["onClick"], $r = ["onClick"], Br = ["colspan"], Ar = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Nr = { class: "relative z-10" }, Mr = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Rr = { class: "flex flex-1 justify-between sm:hidden" }, Lr = ["disabled"], Fr = ["disabled"], Tr = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Er = {
  key: 0,
  class: "flex items-center gap-2 text-sm text-gray-700"
}, Or = {
  key: 1,
  class: "text-sm text-gray-700"
}, Dr = { key: 1 }, mt = /* @__PURE__ */ V({
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
    tableClassName: { default: "" },
    tableBodyClass: {},
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
      checkboxColumnWidth: u,
      expandColumnWidth: d,
      indexColumnWidth: g,
      rowsItems: n,
      preventContextMenuRow: i,
      showIndexSymbol: l,
      currentPage: s,
      filterOptions: h,
      headers: x,
      itemsSelected: k,
      loading: S,
      items: C,
      rowsPerPage: B,
      searchField: R,
      searchValue: F,
      serverItemsLength: H,
      showIndex: E,
      sortBy: we,
      sortType: me,
      serverOptions: te,
      multiSort: ae,
      mustSort: ke,
      clickEventType: q,
      fixedExpand: Pe,
      fixedCheckbox: I,
      fixedIndex: O,
      batchSelectionThreshold: T
    } = Ht(a), f = b(() => yr(a.theme));
    at("themeClasses", f);
    const y = qt(), P = b(() => !!y.pagination), A = b(() => !!y.loading), J = b(() => !!y.expand), re = b(() => !!y.body), Be = b(() => !!(y.paginationInfo || y["pagination-info"])), Ce = G(null), Ae = G(null);
    at("dataTable", Ce);
    const z = r, ye = b(() => k.value !== null), ie = b(() => te.value !== null), {
      serverOptionsComputed: Fe,
      updateServerOptionsPage: yt,
      updateServerOptionsSort: bt,
      updateServerOptionsRowsPerPage: xt
    } = ar(
      te,
      ae,
      z
    ), {
      clientSortOptions: Ke,
      headerColumns: Ge,
      headersForRender: ue,
      updateSortField: wt,
      isMultiSorting: kt,
      getMultiSortNumber: Pt
    } = Ga(
      l,
      u,
      d,
      I,
      Pe,
      O,
      x,
      J,
      g,
      ye,
      ie,
      ke,
      Fe,
      E,
      we,
      me,
      ae,
      bt,
      z
    ), {
      rowsItemsComputed: Ve,
      rowsPerPageRef: se,
      updateRowsPerPage: Ct
    } = tr(
      ie,
      n,
      te,
      B
    ), {
      totalItems: Je,
      selectItemsComputed: _t,
      totalItemsLength: _e,
      toggleSelectAll: St,
      toggleSelectItem: It,
      isProcessing: $t,
      processProgress: Bt
    } = ur(
      Ke,
      h,
      ie,
      C,
      k,
      R,
      F,
      H,
      ae,
      T,
      z
    ), {
      currentPaginationNumber: Y,
      maxPaginationNumber: Se,
      isLastPage: ce,
      isFirstPage: de,
      nextPage: fe,
      prevPage: ge,
      updatePage: Ie,
      updateCurrentPaginationNumber: At
    } = er(
      s,
      ie,
      S,
      _e,
      se,
      te,
      yt
    ), {
      currentPageFirstIndex: Te,
      currentPageLastIndex: Ee,
      multipleSelectStatus: Ye,
      pageItems: ve
    } = Xa(
      Y,
      ye,
      ie,
      C,
      se,
      _t,
      E,
      Je,
      _e
    ), Z = b(() => Y.value === 0 ? 0 : (Y.value - 1) * se.value), {
      expandingItemIndexList: Ne,
      updateExpandingItemIndexList: Me,
      clearExpandingItemIndexList: Ze
    } = Ua(
      ve,
      Z,
      z
    ), {
      fixedHeaders: Qe,
      lastFixedColumn: Nt,
      fixedColumnsInfos: Mt,
      showShadow: Xe
    } = Ka(
      ue,
      Ae
    ), {
      clickRow: et
    } = Wa(
      q,
      ye,
      E,
      z
    ), Rt = (c, M) => {
      i.value && M.preventDefault(), z("contextmenuRow", c, M);
    }, Lt = (c) => {
      const M = c.width ?? (Qe.value.length ? 100 : null);
      if (M) return `width: ${M}px; min-width: ${M}px;`;
    }, tt = (c, M = "th") => {
      if (!Qe.value.length) return;
      const v = Mt.value.find((N) => N.value === c);
      if (v)
        return `
            left: ${v.distance}px;
            z-index: ${M === "th" ? 3 : 1};
            position: sticky;
            background-color: ${M === "th" ? "none" : "inherit"};
        `;
    };
    return ne(S, (c, M) => {
      Fe.value && c === !1 && M === !0 && (At(Fe.value.page), Ze());
    }), ne(se, (c) => {
      ie.value ? xt(c) : Ie(1);
    }), ne([F, h], () => {
      ie.value || Ie(1);
    }), ne([Y, Ke, R, F, h], () => {
      Ze();
    }, { deep: !0 }), ne(ve, (c) => {
      z("updatePageItems", c);
    }, { deep: !0 }), ne(Je, (c) => {
      z("updateTotalItems", c);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Te,
      currentPageLastIndex: Ee,
      clientItemsLength: _e,
      maxPaginationNumber: Se,
      currentPaginationNumber: Y,
      isLastPage: ce,
      isFirstPage: de,
      nextPage: fe,
      prevPage: ge,
      updatePage: Ie,
      rowsPerPageOptions: Ve,
      rowsPerPageActiveOption: se,
      updateRowsPerPageActiveOption: Ct
    }), (c, M) => (p(), m("div", {
      ref_key: "dataTable",
      ref: Ce,
      class: _(["relative w-full", [c.tableClassName]])
    }, [
      w("div", {
        ref_key: "tableBody",
        ref: Ae,
        class: _(["relative overflow-auto border border-gray-200 min-h-[180px]", [{ "shadow-sm": o(Xe) }, c.tableBodyClass]])
      }, [
        w("table", {
          id: c.tableNodeId,
          class: "w-full border-collapse bg-white"
        }, [
          w("colgroup", null, [
            (p(!0), m(ee, null, he(o(ue), (v, N) => (p(), m("col", {
              key: N,
              style: oe(Lt(v))
            }, null, 4))), 128))
          ]),
          o(y)["customize-headers"] ? L(c.$slots, "customize-headers", { key: 0 }) : o(ue).length && !c.hideHeader ? (p(), m("thead", {
            key: 1,
            class: _([
              "text-sm text-slate-700 uppercase bg-gray-100 text-nowrap",
              c.headerClassName,
              { "sticky top-0 z-10": c.fixedHeader }
            ])
          }, [
            w("tr", {
              class: _([{ "divide-x divide-gray-200": c.borderCell }])
            }, [
              (p(!0), m(ee, null, he(o(ue), (v, N) => (p(), m("th", {
                key: N,
                style: oe(tt(v.value)),
                class: _(["px-4 py-3 font-semibold tracking-wider group", [
                  {
                    "cursor-pointer hover:bg-gray-200": v.sortable,
                    "bg-gray-100": v.sortable && v.sortType === "none" && c.headerClassName === "" && c.headerClassName === "",
                    "bg-gray-200": (v.sortable && v.sortType === "desc" || v.sortType === "asc") && c.headerClassName === "",
                    "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": v.value === o(Nt)
                  },
                  typeof c.headerItemClassName == "string" ? c.headerItemClassName : c.headerItemClassName(v, N + 1),
                  `text-${c.headerTextDirection}`
                ]]),
                onClick: ($) => v.sortable && v.sortType ? o(wt)(v.value, v.sortType) : null
              }, [
                v.text === "checkbox" && o(k) !== null ? (p(), X(Jt, {
                  key: o(Ye),
                  status: o(Ye),
                  onChange: o(St)
                }, null, 8, ["status", "onChange"])) : (p(), m("div", kr, [
                  o(y)[`header-${v.value}`] ? L(c.$slots, `header-${v.value}`, W({
                    key: 0,
                    ref_for: !0
                  }, v)) : o(y)[`header-${v.value.toLowerCase()}`] ? L(c.$slots, `header-${v.value.toLowerCase()}`, W({
                    key: 1,
                    ref_for: !0
                  }, v)) : o(y).header ? L(c.$slots, "header", W({
                    key: 2,
                    ref_for: !0
                  }, v)) : (p(), m("span", Pr, j(v.text), 1)),
                  v.sortable ? (p(), m("span", {
                    key: v.sortType ? v.sortType : "none",
                    class: _(["inline-flex transition-opacity duration-200", [v.sortType === "none" ? "opacity-0" : "opacity-100", "group-hover:opacity-100"]])
                  }, [
                    K(o(Aa), {
                      class: _({ "transform rotate-180": v.sortType === "desc" })
                    }, null, 8, ["class"])
                  ], 2)) : D("", !0),
                  o(ae) && o(kt)(v.value) ? (p(), m("span", Cr, j(o(Pt)(v.value)), 1)) : D("", !0)
                ]))
              ], 14, wr))), 128))
            ], 2)
          ], 2)) : D("", !0),
          re.value ? L(c.$slots, "body", $e(W({ key: 2 }, o(ve)))) : o(Ge).length ? (p(), m("tbody", _r, [
            L(c.$slots, "body-prepend", $e(rt({
              items: o(ve),
              pagination: {
                isFirstPage: o(de),
                isLastPage: o(ce),
                currentPaginationNumber: o(Y),
                maxPaginationNumber: o(Se),
                nextPage: o(fe),
                prevPage: o(ge)
              },
              headers: o(ue)
            }))),
            (p(!0), m(ee, null, he(o(ve), (v, N) => (p(), m(ee, {
              key: v.key || N
            }, [
              w("tr", {
                class: _(["transition-colors bg-white", [
                  { "even:bg-gray-50 odd:bg-white": c.alternating },
                  !c.noHover && "hover:bg-gray-100",
                  typeof c.bodyRowClassName == "string" ? c.bodyRowClassName : c.bodyRowClassName(v, N + 1),
                  { "divide-x divide-gray-200": c.borderCell }
                ]]),
                onClick: ($) => {
                  o(et)(v, "single", $), c.clickRowToExpand && o(Me)(N + Z.value, v, $);
                },
                onDblclick: ($) => o(et)(v, "double", $),
                onContextmenu: ($) => Rt(v, $)
              }, [
                (p(!0), m(ee, null, he(o(Ge), ($, Ft) => (p(), m("td", {
                  key: Ft,
                  style: oe(tt($, "td")),
                  class: _(["px-4 py-2", [
                    {
                      "cursor-pointer": $ === "expand" && c.expandColumn === ""
                    },
                    typeof c.bodyItemClassName == "string" ? c.bodyItemClassName : c.bodyItemClassName($, N + 1),
                    `text-${c.bodyTextDirection}`
                  ]]),
                  onClick: (be) => $ === "expand" && c.expandColumn === "" ? o(Me)(N + Z.value, v, be) : null
                }, [
                  o(y)[`item-${$}`] ? L(c.$slots, `item-${$}`, W({
                    key: 0,
                    ref_for: !0
                  }, v)) : o(y)[`item-${$.toLowerCase()}`] ? L(c.$slots, `item-${$.toLowerCase()}`, W({
                    key: 1,
                    ref_for: !0
                  }, v)) : $ === c.expandColumn ? L(c.$slots, "expand-button", {
                    key: 2,
                    item: v,
                    expanded: o(Ne).includes(Z.value + N),
                    toggle: (be) => o(Me)(N + Z.value, v, be)
                  }, () => [
                    w("button", {
                      onClick: dt((be) => o(Me)(N + Z.value, v, be), ["stop"]),
                      class: "inline-flex items-center"
                    }, [
                      K(o(ka), {
                        class: _({ "transform -rotate-90": o(Ne).includes(Z.value + N) })
                      }, null, 8, ["class"])
                    ], 8, $r)
                  ]) : $ === "expand" && c.expandColumn === "" ? (p(), X(o(Sa), {
                    key: 3,
                    class: _({ "transform rotate-90": o(Ne).includes(Z.value + N) })
                  }, null, 8, ["class"])) : $ === "checkbox" ? (p(), X(vt, {
                    key: 4,
                    checked: v[$],
                    onChange: (be) => o(It)(v)
                  }, null, 8, ["checked", "onChange"])) : o(y).item ? L(c.$slots, "item", W({
                    key: 5,
                    ref_for: !0
                  }, { column: $, item: v })) : (p(), m(ee, { key: 6 }, [
                    De(j(o(lr)($, v)), 1)
                  ], 64))
                ], 14, Ir))), 128))
              ], 42, Sr),
              J.value && o(Ne).includes(N + Z.value) ? (p(), m("tr", {
                key: 0,
                class: _([
                  { "bg-gray-50": (N + 1) % 2 === 0 },
                  typeof c.bodyExpandRowClassName == "string" ? c.bodyExpandRowClassName : c.bodyExpandRowClassName(v, N + 1)
                ])
              }, [
                w("td", {
                  colspan: o(ue).length,
                  class: "px-4 py-2"
                }, [
                  v.expandLoading ? (p(), X(ia, {
                    key: 0,
                    class: "mb-4"
                  })) : D("", !0),
                  L(c.$slots, "expand", W({ ref_for: !0 }, v))
                ], 8, Br)
              ], 2)) : D("", !0)
            ], 64))), 128)),
            L(c.$slots, "body-append", $e(rt({
              items: o(ve),
              pagination: {
                isFirstPage: o(de),
                isLastPage: o(ce),
                currentPaginationNumber: o(Y),
                maxPaginationNumber: o(Se),
                nextPage: o(fe),
                prevPage: o(ge),
                updatePage: o(Ie)
              },
              headers: o(ue)
            })))
          ])) : D("", !0)
        ], 8, xr),
        o(S) ? (p(), m("div", Ar, [
          w("div", Nr, [
            A.value ? L(c.$slots, "loading", { key: 0 }) : (p(), X(na, { key: 1 }))
          ])
        ])) : D("", !0),
        !o(ve).length && !o(S) ? (p(), m("div", Mr, [
          L(c.$slots, "empty-message", {}, () => [
            De(j(c.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      c.hideFooter ? D("", !0) : (p(), m("div", {
        key: 0,
        class: _(["flex items-center justify-between px-4 py-3 bg-white", {
          "border border-gray-200 border-t-0": !0,
          "shadow-sm": o(Xe)
        }])
      }, [
        w("div", Rr, [
          w("button", {
            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: M[0] || (M[0] = //@ts-ignore
            (...v) => o(ge) && o(ge)(...v)),
            disabled: o(de)
          }, [
            K(o(ht), {
              class: _({ "opacity-50": o(de) })
            }, null, 8, ["class"])
          ], 8, Lr),
          w("button", {
            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: M[1] || (M[1] = //@ts-ignore
            (...v) => o(fe) && o(fe)(...v)),
            disabled: o(ce)
          }, [
            K(o(pt), {
              class: _({ "opacity-50": o(ce) })
            }, null, 8, ["class"])
          ], 8, Fr)
        ]),
        w("div", Tr, [
          c.hideRowsPerPage ? D("", !0) : (p(), m("div", Er, [
            De(j(c.rowsPerPageMessage) + " ", 1),
            K(aa, {
              modelValue: o(se),
              "onUpdate:modelValue": M[2] || (M[2] = (v) => zt(se) ? se.value = v : null),
              "rows-items": o(Ve)
            }, null, 8, ["modelValue", "rows-items"])
          ])),
          c.hidePaginationInfo ? D("", !0) : (p(), m("div", Or, [
            Be.value ? L(c.$slots, "pagination-info", $e(W({ key: 0 }, {
              currentPageFirstIndex: o(Te),
              currentPageLastIndex: o(Ee),
              totalItemsLength: o(_e),
              rowsOfPageSeparatorMessage: c.rowsOfPageSeparatorMessage
            }))) : (p(), m("span", Dr, j(`${o(Te)}–${o(Ee)}`) + " " + j(c.rowsOfPageSeparatorMessage) + " " + j(o(_e)), 1))
          ])),
          P.value ? L(c.$slots, "pagination", $e(W({ key: 2 }, {
            isFirstPage: o(de),
            isLastPage: o(ce),
            currentPaginationNumber: o(Y),
            maxPaginationNumber: o(Se),
            nextPage: o(fe),
            prevPage: o(ge)
          }))) : (p(), X(Ea, {
            key: 3,
            "is-first-page": o(de),
            "is-last-page": o(ce),
            onClickNextPage: o(fe),
            onClickPrevPage: o(ge)
          }, Wt({ _: 2 }, [
            c.buttonsPagination ? {
              name: "buttonsPagination",
              fn: gt(() => [
                K(Ra, {
                  "current-pagination-number": o(Y),
                  "max-pagination-number": o(Se),
                  onUpdatePage: o(Ie)
                }, null, 8, ["current-pagination-number", "max-pagination-number", "onUpdatePage"])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["is-first-page", "is-last-page", "onClickNextPage", "onClickPrevPage"]))
        ])
      ], 2)),
      ze(K(za, { progress: o(Bt) }, null, 8, ["progress"]), [
        [We, o($t)]
      ])
    ], 2));
  }
}), jr = (e) => {
  e.component("DataTable", mt);
};
mt.install = jr;
export {
  zr as createFilter,
  mt as default,
  jr as install
};
