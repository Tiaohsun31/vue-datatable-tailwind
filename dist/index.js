var Et = Object.defineProperty;
var Ot = (e, t, r) => t in e ? Et(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var je = (e, t, r) => Ot(e, typeof t != "symbol" ? t + "" : t, r);
import { defineComponent as V, computed as b, inject as be, openBlock as p, createElementBlock as y, withModifiers as gt, createElementVNode as w, normalizeClass as _, normalizeStyle as oe, unref as o, withDirectives as Ue, vShow as Ke, createBlock as ne, ref as G, watch as se, onMounted as vt, onBeforeUnmount as Dt, toDisplayString as j, createVNode as z, Transition as jt, withCtx as pt, Fragment as X, renderList as he, createCommentVNode as D, renderSlot as M, onUnmounted as Ht, toRefs as qt, provide as st, useSlots as zt, mergeProps as q, normalizeProps as Se, guardReactiveProps as nt, createTextVNode as He, isRef as Wt, createSlots as Ut } from "vue";
const Kt = ["checked", "aria-checked"], Gt = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Vt = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Jt = /* @__PURE__ */ V({
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
    const t = e, r = b(() => t.checked), a = b(() => t.partial), u = be("themeClasses");
    return (d, v) => (p(), y("div", {
      class: "relative inline-flex items-center justify-center h-5 w-5 cursor-pointer group",
      onClick: v[0] || (v[0] = gt((n) => d.$emit("change"), ["stop", "prevent"]))
    }, [
      w("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: r.value,
        "aria-checked": r.value
      }, null, 8, Kt),
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
        Ue((p(), y("svg", Gt, v[1] || (v[1] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ke, r.value && !a.value]
        ]),
        Ue((p(), y("svg", Vt, v[2] || (v[2] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ke, a.value]
        ])
      ], 6)
    ]));
  }
}), ht = /* @__PURE__ */ V({
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
    return (a, u) => (p(), ne(Jt, {
      checked: e.checked,
      partial: !1,
      onChange: u[0] || (u[0] = (d) => r("change"))
    }, null, 8, ["checked"]));
  }
}), Yt = /* @__PURE__ */ V({
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
    return (v, n) => (p(), ne(ht, {
      checked: a.value,
      partial: u.value,
      onChange: n[0] || (n[0] = (i) => d("change", !a.value))
    }, null, 8, ["checked", "partial"]));
  }
}), Zt = { class: "relative inline-block min-w-[70px]" }, Qt = ["aria-expanded"], Xt = { class: "block truncate" }, ea = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, ta = ["aria-selected", "onClick"], aa = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, ra = /* @__PURE__ */ V({
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
    const r = e, a = t, u = G(!1), d = G(!1), v = b({
      get: () => r.modelValue,
      set: (x) => a("update:modelValue", x)
    }), n = be("dataTable");
    se(u, (x) => {
      if (x && (n != null && n.value)) {
        const k = window.innerHeight, S = n.value.getBoundingClientRect(), C = k - (S.height + S.top);
        d.value = C <= 100;
      }
    });
    const i = (x) => {
      v.value = x, u.value = !1;
    }, l = () => {
      u.value = !u.value;
    }, s = (x) => {
      x.target.closest(".relative") || (u.value = !1);
    }, m = (x) => {
      const k = x.relatedTarget;
      k != null && k.closest(".relative") || (u.value = !1);
    };
    return vt(() => {
      document.addEventListener("click", s);
    }), Dt(() => {
      document.removeEventListener("click", s);
    }), (x, k) => (p(), y("div", Zt, [
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
        w("span", Xt, j(v.value), 1),
        w("span", ea, [
          (p(), y("svg", {
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
      ], 10, Qt),
      z(jt, {
        "enter-active-class": "transition duration-100 ease-out",
        "enter-from-class": "transform scale-95 opacity-0",
        "enter-to-class": "transform scale-100 opacity-100",
        "leave-active-class": "transition duration-75 ease-in",
        "leave-from-class": "transform scale-100 opacity-100",
        "leave-to-class": "transform scale-95 opacity-0"
      }, {
        default: pt(() => [
          u.value ? (p(), y("ul", {
            key: 0,
            class: _(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": d.value }]),
            tabindex: "-1",
            role: "listbox",
            onFocusout: m
          }, [
            (p(!0), y(X, null, he(e.rowsItems, (S) => (p(), y("li", {
              key: S,
              class: _(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                S === v.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
              ]]),
              role: "option",
              "aria-selected": S === v.value,
              onClick: (C) => i(S)
            }, [
              w("span", {
                class: _(["block", { "font-medium": S === v.value }])
              }, j(S), 3),
              S === v.value ? (p(), y("span", aa, k[1] || (k[1] = [
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
            ], 10, ta))), 128))
          ], 34)) : D("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), sa = { class: "inline-flex relative w-[60px] h-[60px]" }, na = /* @__PURE__ */ V({
  __name: "Loading",
  setup(e) {
    const t = be("themeClasses");
    return (r, a) => (p(), y("div", sa, [
      (p(), y(X, null, he(4, (u) => w("div", {
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
}, oa = /* @__PURE__ */ le(na, [["__scopeId", "data-v-e9a27991"]]), la = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, ia = /* @__PURE__ */ V({
  __name: "LoadingLine",
  setup(e) {
    const t = be("themeClasses");
    return (r, a) => (p(), y("div", la, [
      w("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: oe({ backgroundColor: o(t).hex })
      }, null, 4)
    ]));
  }
}), ua = /* @__PURE__ */ le(ia, [["__scopeId", "data-v-cbdc3562"]]), ca = {}, da = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function fa(e, t) {
  return p(), y("svg", da, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const mt = /* @__PURE__ */ le(ca, [["render", fa]]), ga = {}, va = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function pa(e, t) {
  return p(), y("svg", va, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const yt = /* @__PURE__ */ le(ga, [["render", pa]]), ha = {}, ma = { class: "px-3 py-1.5" };
function ya(e, t) {
  return p(), y("span", ma, t[0] || (t[0] = [
    w("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      w("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const ba = /* @__PURE__ */ le(ha, [["render", ya]]), xa = {}, wa = {
  class: "w-4 h-4 transition-transform duration-200",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function ka(e, t) {
  return p(), y("svg", wa, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Pa = /* @__PURE__ */ le(xa, [["render", ka]]), Ca = {}, _a = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Sa(e, t) {
  return p(), y("svg", _a, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Ia = /* @__PURE__ */ le(Ca, [["render", Sa]]), $a = {}, Ba = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Aa(e, t) {
  return p(), y("svg", Ba, t[0] || (t[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Na = /* @__PURE__ */ le($a, [["render", Aa]]), Ra = {
  class: "inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Ma = ["onClick"], pe = 7, La = /* @__PURE__ */ V({
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
    const r = e, a = t, u = be("themeClasses"), d = (n) => {
      n.type === "button" && !n.active && a("updatePage", n.page);
    }, v = b(() => {
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
            const m = i - (pe - s);
            n.push({
              type: "button",
              page: m,
              active: m === l,
              activePrev: m + 1 === l
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
            const m = i - (pe - s);
            n.push({
              type: "button",
              page: m,
              active: m === l,
              activePrev: m + 1 === l
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
            const m = 4 - s, x = l - m;
            n.push({
              type: "button",
              page: x,
              active: x === l,
              activePrev: x + 1 === l
            });
          }
      return n;
    });
    return (n, i) => (p(), y("div", Ra, [
      (p(!0), y(X, null, he(v.value, (l, s) => (p(), y("div", {
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
        onClick: (m) => d(l)
      }, [
        l.type === "button" ? (p(), y("span", {
          key: 0,
          class: _(["px-3 py-1.5", { "font-medium": l.active }])
        }, j(l.page), 3)) : (p(), ne(o(ba), { key: 1 }))
      ], 14, Ma))), 128))
    ]));
  }
}), Ta = {
  class: "flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Fa = ["disabled"], Ea = ["disabled"], Oa = /* @__PURE__ */ V({
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
    return (a, u) => (p(), y("div", Ta, [
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
        z(o(yt), {
          class: _({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Fa),
      M(a.$slots, "buttonsPagination"),
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
        z(o(mt), {
          class: _({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Ea)
    ]));
  }
}), Da = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, ja = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Ha = { class: "w-64" }, qa = { class: "h-2 bg-gray-200 rounded" }, za = { class: "text-center text-sm text-gray-600" }, Wa = /* @__PURE__ */ V({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = be("themeClasses");
    return (r, a) => (p(), y("div", Da, [
      w("div", ja, [
        a[0] || (a[0] = w("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        w("div", Ha, [
          w("div", qa, [
            w("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: oe({ width: `${r.progress}%`, backgroundColor: o(t).hex })
            }, null, 4)
          ])
        ]),
        w("div", za, j(Math.round(r.progress)) + "% ", 1)
      ])
    ]));
  }
});
function Ua(e, t, r, a) {
  return {
    clickRow: (d, v, n) => {
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
      a("clickRow", i, n);
    }
  };
}
function Ka(e, t, r) {
  const a = G([]);
  return {
    expandingItemIndexList: a,
    // 展開項的索引列表
    updateExpandingItemIndexList: (v, n, i) => {
      i.stopPropagation();
      const l = a.value.indexOf(v);
      if (l !== -1)
        a.value.splice(l, 1);
      else {
        const s = e.value.findIndex((m) => JSON.stringify(m) === JSON.stringify(n));
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
function Ga(e, t) {
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
      distance: l === 0 ? 0 : n.reduce((s, m, x) => x < l ? s + m : s, 0)
    }));
  }), d = G(!1);
  let v = null;
  return vt(() => {
    const n = t.value;
    if (n) {
      const i = () => {
        d.value = n.scrollLeft > 0;
      };
      i(), n.addEventListener("scroll", i), v = () => {
        n.removeEventListener("scroll", i);
      };
    }
  }), Ht(() => {
    v && (v(), v = null);
  }), {
    fixedHeaders: r,
    lastFixedColumn: a,
    fixedColumnsInfos: u,
    showShadow: d
  };
}
function Va(e, t, r, a, u, d, v, n, i, l, s, m, x, k, S, C, B, L, T) {
  const W = b(() => v.value.length ? {
    hasFixedColumns: v.value.some(($) => $.fixed),
    fixedHeaders: v.value.filter(($) => $.fixed),
    unFixedHeaders: v.value.filter(($) => !$.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), E = G(
    Ja(S.value, C.value, B.value)
  ), { determineHeaderSortState: xe } = Qa(s, x, B, E), me = b(() => {
    const { fixedHeaders: $, unFixedHeaders: O } = W.value, F = [...$, ...O].map((f) => ({
      ...f,
      sortType: f.sortable ? xe(f.value) : void 0
    }));
    return [
      ...Object.values(ee.value).filter(Boolean),
      ...F
    ];
  }), ee = b(() => ({
    checkbox: l.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: a.value || W.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: k.value && {
      text: e.value,
      value: "index",
      fixed: d.value || W.value.hasFixedColumns,
      width: i.value
    },
    expand: n.value && {
      text: "",
      value: "expand",
      fixed: u.value || W.value.hasFixedColumns,
      width: r.value
    }
  })), te = b(
    () => me.value.map(($) => $.value)
  ), we = ($, O) => {
    const F = O === "none" ? "asc" : O === "asc" ? "desc" : m.value ? "asc" : null;
    if (s.value) {
      L($, F);
      return;
    }
    const f = B.value ? Ya($, F, E.value) : Za($, F);
    E.value = f, T("updateSort", { sortType: F, sortBy: $ });
  }, U = b(() => ($) => {
    var F, f;
    const O = s.value ? (F = x.value) == null ? void 0 : F.sortBy : (f = E.value) == null ? void 0 : f.sortBy;
    return Array.isArray(O) && O.includes($);
  }), ke = b(() => ($) => {
    var F, f;
    const O = s.value ? (F = x.value) == null ? void 0 : F.sortBy : (f = E.value) == null ? void 0 : f.sortBy;
    return Array.isArray(O) ? O.indexOf($) + 1 : !1;
  });
  return {
    clientSortOptions: E,
    headerColumns: te,
    headersForRender: me,
    updateSortField: we,
    isMultiSorting: U,
    getMultiSortNumber: ke
  };
}
function Ja(e, t, r) {
  return r && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((a) => a === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const Ya = (e, t, r) => {
  if (!(r != null && r.sortBy) || !Array.isArray(r.sortBy) || !Array.isArray(r.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const a = r.sortBy.indexOf(e), u = [...r.sortBy], d = [...r.sortDesc];
  return a === -1 && t !== null ? (u.push(e), d.push(t === "desc")) : t === null ? (u.splice(a, 1), d.splice(a, 1)) : d[a] = t === "desc", { sortBy: u, sortDesc: d };
}, Za = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function Qa(e, t, r, a) {
  const u = (n) => !e.value || !t.value ? d(n) : v(n), d = (n) => {
    if (!a.value) return "none";
    const { sortBy: i, sortDesc: l } = a.value;
    if (r.value && Array.isArray(i) && Array.isArray(l)) {
      const s = i.indexOf(n);
      return s !== -1 ? l[s] ? "desc" : "asc" : "none";
    }
    return n === i ? l ? "desc" : "asc" : "none";
  }, v = (n) => {
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
class Xa {
  constructor() {
    je(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    je(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let r = this.itemKeyCache.get(t);
    if (!r) {
      const { checkbox: a, index: u, ...d } = t;
      r = Object.entries(d).sort(([v], [n]) => v.localeCompare(n)).map(([v, n]) => `${v}:${n}`).join("|"), this.itemKeyCache.set(t, r);
    }
    return r;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function er(e, t, r, a, u, d, v, n, i) {
  const l = new Xa(), s = b(
    () => (e.value - 1) * u.value + 1
  ), m = b(() => r.value ? Math.min(
    i.value,
    e.value * u.value
  ) : Math.min(
    n.value.length,
    e.value * u.value
  )), x = b(() => r.value ? a.value : n.value.slice(
    s.value - 1,
    m.value
  )), k = b(() => v.value ? x.value.map((B, L) => ({
    index: s.value + L,
    ...B
  })) : x.value), S = b(() => d.value.length === 0 || !d.value.some(
    (L) => n.value.some(
      (T) => l.getItemKey(L) === l.getItemKey(T)
    )
  ) ? "noneSelected" : d.value.length === n.value.length && d.value.every(
    (T) => n.value.some(
      (W) => l.getItemKey(T) === l.getItemKey(W)
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
            (T) => l.getItemKey(B) === l.getItemKey(T)
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
function tr(e, t, r, a, u, d, v) {
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
          v(C);
        } else
          n.value += 1;
    },
    prevPage: () => {
      if (a.value !== 0 && !s.value && !r.value)
        if (t.value) {
          const C = n.value - 1;
          v(C);
        } else
          n.value -= 1;
    },
    updatePage: (C) => {
      r.value || (t.value ? v(C) : n.value = C);
    },
    updateCurrentPaginationNumber: (C) => {
      n.value = C;
    }
  };
}
function ar(e, t, r, a) {
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
function rr(e, t, r) {
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
function sr(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function nr(e) {
  return e.comparison === "in";
}
function or(e) {
  return typeof e.comparison == "function";
}
function lr(e) {
  return typeof e == "number" && !isNaN(e);
}
const Wr = {
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
function K(e, t) {
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
function ir(e, t) {
  const r = K(e, t);
  return Array.isArray(r) ? r.join(",") : r;
}
const ot = 1e3, lt = /* @__PURE__ */ new WeakMap(), Me = (e) => {
  let t = lt.get(e);
  if (!t) {
    const { checkbox: r, index: a, ...u } = e;
    t = JSON.stringify(u), lt.set(e, t);
  }
  return t;
};
function ur(e, t, r) {
  const a = G({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  se(t, (l) => {
    if (l === null) {
      a.value.selectedItems.clear(), a.value.itemsMap.clear();
      return;
    }
    const s = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const x of l) {
      const k = Me(x);
      s.add(k), m.set(k, x);
    }
    a.value.selectedItems = s, a.value.itemsMap = m;
  }, { immediate: !0, deep: !0 });
  const u = async (l, s, m) => new Promise((x) => {
    requestAnimationFrame(() => {
      const k = new Set(a.value.selectedItems), S = new Map(a.value.itemsMap);
      for (let C = 0; C < l.length; C++) {
        const B = l[C], L = Me(B);
        s ? (k.add(L), S.set(L, B)) : k.delete(L), a.value.processedCount = m + C + 1, a.value.visualProgress = a.value.processedCount / a.value.totalCount * 100;
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
        for (let m = 0; m < s.length; m += ot) {
          const x = s.slice(m, Math.min(m + ot, s.length));
          await u(x, l, m), await new Promise((k) => setTimeout(k, 0));
        }
        r("update:itemsSelected", n.value), l && r("selectAll");
      } finally {
        a.value.selectionInProgress = !1;
      }
  }, v = (l) => {
    const s = Me(l), m = { ...l };
    delete m.checkbox, delete m.index;
    const x = new Set(a.value.selectedItems), k = new Map(a.value.itemsMap);
    x.has(s) ? (x.delete(s), r("deselectRow", m)) : (x.add(s), k.set(s, m), r("selectRow", m)), a.value.selectedItems = x, a.value.itemsMap = k, r("update:itemsSelected", Array.from(k.values()).filter((C) => x.has(Me(C))));
  }, n = b(() => a.value.selectedItems.size === 0 ? [] : Array.from(a.value.itemsMap.entries()).filter(([l]) => a.value.selectedItems.has(l)).map(([, l]) => l)), i = b(() => a.value.visualProgress);
  return {
    selectedItems: n,
    toggleSelectAll: d,
    toggleSelectItem: v,
    isProcessing: b(() => a.value.selectionInProgress),
    selectionProgress: i
  };
}
function cr(e, t, r, a, u, d, v, n, i, l, s) {
  const m = /* @__PURE__ */ new WeakMap(), x = (f) => {
    let P = m.get(f);
    return P || (typeof d.value == "string" && d.value !== "" ? P = String(K(d.value, f)) : Array.isArray(d.value) ? P = d.value.map((h) => String(K(h, f))).join(" ") : P = Object.values(f).map(String).join(" "), m.set(f, P)), P;
  }, k = b(() => {
    if (!r.value && v.value !== "") {
      const f = new RegExp(v.value, "i");
      return a.value.filter((P) => f.test(x(P)));
    }
    return a.value;
  }), S = (f, P) => {
    const h = lr(f) ? f : parseFloat(String(f));
    if (isNaN(h)) return !1;
    if (P.comparison === "between" && Array.isArray(P.criteria)) {
      const [ae, J] = P.criteria;
      return h >= ae && h <= J;
    }
    const N = P.criteria;
    switch (P.comparison) {
      case ">":
        return h > N;
      case ">=":
        return h >= N;
      case "<":
        return h < N;
      case "<=":
        return h <= N;
      default:
        return !1;
    }
  }, C = b(() => {
    var f;
    return (f = t.value) != null && f.length ? k.value.filter(
      (P) => t.value.every((h) => {
        const N = K(h.field, P);
        return or(h) ? h.comparison(N, h.criteria) : sr(h) ? S(N, h) : nr(h) ? h.criteria.includes(N) : h.comparison === "=" ? N === h.criteria : N !== h.criteria;
      })
    ) : k.value;
  }), B = (f, P, h) => f === P ? 0 : f == null ? 1 : P == null ? -1 : f < P ? h ? 1 : -1 : h ? -1 : 1, L = (f, P, h, N) => N < 0 ? f : L(f, P, h, N - 1).sort((ae, J) => {
    if (!P.slice(0, N).every((H) => K(H, ae) === K(H, J))) return 0;
    const $e = P[N], Be = K($e, ae), Ae = K($e, J);
    return B(Be, Ae, h[N]);
  }), T = b(() => {
    if (r.value) return a.value;
    if (!e.value) return C.value;
    const { sortBy: f, sortDesc: P } = e.value, h = [...C.value];
    return i.value && Array.isArray(f) && Array.isArray(P) ? f.length ? L(h, f, P, f.length - 1) : h : h.sort((N, ae) => {
      const J = K(f, N), Ie = K(f, ae);
      return B(J, Ie, P);
    });
  }), W = b(() => r.value ? n.value : T.value.length), E = b(() => r.value ? !1 : (r.value ? n.value : a.value.length) >= l.value), {
    selectedItems: xe,
    toggleSelectAll: me,
    toggleSelectItem: ee,
    isProcessing: te,
    selectionProgress: we
  } = ur(T, u, s), U = b({
    get: () => u.value ?? [],
    set: (f) => {
      s("update:itemsSelected", f);
    }
  }), ke = (f) => {
    U.value = f ? T.value : [], f && s("selectAll");
  }, $ = (f) => {
    const P = f.checkbox;
    if (delete f.checkbox, delete f.index, P)
      U.value = U.value.filter(
        (h) => JSON.stringify(h) !== JSON.stringify(f)
      ), s("deselectRow", f);
    else {
      const h = U.value;
      h.unshift(f), U.value = h, s("selectRow", f);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: U,
    totalItemsLength: W,
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
      E.value ? ee(f) : $(f);
    },
    isProcessing: b(() => E.value && te.value),
    processProgress: we
  };
}
function dr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qe = {}, ze = {}, Le = { exports: {} }, it;
function fr() {
  if (it) return Le.exports;
  it = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Le.exports = t(), Le.exports.createColors = t, Le.exports;
}
var ut;
function gr() {
  return ut || (ut = 1, function(e) {
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
        return n;
      }
    });
    const r = /* @__PURE__ */ a(/* @__PURE__ */ fr());
    function a(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    let u = /* @__PURE__ */ new Set();
    function d(i, l, s) {
      typeof process < "u" && process.env.JEST_WORKER_ID || s && u.has(s) || (s && u.add(s), console.warn(""), l.forEach((m) => console.warn(i, "-", m)));
    }
    function v(i) {
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
  }(ze)), ze;
}
var ct;
function vr() {
  return ct || (ct = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const t = /* @__PURE__ */ r(gr());
    function r(d) {
      return d && d.__esModule ? d : {
        default: d
      };
    }
    function a({ version: d, from: v, to: n }) {
      t.default.warn(`${v}-color-renamed`, [
        `As of Tailwind CSS ${d}, \`${v}\` has been renamed to \`${n}\`.`,
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
  }(qe)), qe;
}
var We, dt;
function pr() {
  if (dt) return We;
  dt = 1;
  let e = vr();
  return We = (e.__esModule ? e : { default: e }).default, We;
}
var hr = pr();
const Q = /* @__PURE__ */ dr(hr), Ge = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, mr = (e) => {
  const t = ft(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let r = { color: "indigo", variant: "DEFAULT" }, a = 1 / 0;
  const u = Object.entries(Q).reduce((d, [v, n]) => {
    if (typeof n == "object") {
      const i = v;
      Object.entries(Ge).forEach(([l, s]) => {
        n[s] && (d[n[s]] = { color: i, variant: l });
      });
    }
    return d;
  }, {});
  return Object.entries(u).forEach(([d, v]) => {
    const n = ft(d);
    if (!n) return;
    const i = xr(t, n);
    i < a && (a = i, r = v);
  }), r;
}, yr = (e, t) => {
  const r = Ge[t], a = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
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
}, br = (e) => {
  const { color: t, variant: r = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? mr(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : Q[t][Ge[r]],
    tailwindName: t,
    style: yr(t, r)
  };
};
function ft(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function xr(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const wr = ["id"], kr = ["onClick"], Pr = {
  key: 1,
  class: "items-center gap-2"
}, Cr = {
  key: 3,
  class: "header-text"
}, _r = {
  key: 5,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, Sr = {
  key: 3,
  class: "text-sm divide-y divide-gray-200"
}, Ir = ["onClick", "onDblclick", "onContextmenu"], $r = ["onClick"], Br = ["onClick"], Ar = ["colspan"], Nr = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Rr = { class: "relative z-10" }, Mr = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Lr = { class: "flex flex-1 justify-between sm:hidden" }, Tr = ["disabled"], Fr = ["disabled"], Er = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Or = {
  key: 0,
  class: "flex items-center gap-2 text-sm text-gray-700"
}, Dr = {
  key: 1,
  class: "text-sm text-gray-700"
}, jr = { key: 1 }, bt = /* @__PURE__ */ V({
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
    clickRowToSelect: { type: Boolean, default: !1 },
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
      indexColumnWidth: v,
      rowsItems: n,
      preventContextMenuRow: i,
      showIndexSymbol: l,
      currentPage: s,
      filterOptions: m,
      headers: x,
      itemsSelected: k,
      loading: S,
      items: C,
      rowsPerPage: B,
      searchField: L,
      searchValue: T,
      serverItemsLength: W,
      showIndex: E,
      sortBy: xe,
      sortType: me,
      serverOptions: ee,
      multiSort: te,
      mustSort: we,
      clickEventType: U,
      clickRowToSelect: ke,
      fixedExpand: $,
      fixedCheckbox: O,
      fixedIndex: F,
      batchSelectionThreshold: f
    } = qt(a), P = b(() => br(a.theme));
    st("themeClasses", P);
    const h = zt(), N = b(() => !!h.pagination), ae = b(() => !!h.loading), J = b(() => !!h.expand), Ie = b(() => !!h.body), $e = b(() => !!(h.paginationInfo || h["pagination-info"])), Be = G(null), Ae = G(null);
    st("dataTable", Be);
    const H = r, Te = b(() => k.value !== null), ie = b(() => ee.value !== null), {
      serverOptionsComputed: Fe,
      updateServerOptionsPage: xt,
      updateServerOptionsSort: wt,
      updateServerOptionsRowsPerPage: kt
    } = rr(
      ee,
      te,
      H
    ), {
      clientSortOptions: Ve,
      headerColumns: Je,
      headersForRender: ue,
      updateSortField: Pt,
      isMultiSorting: Ct,
      getMultiSortNumber: _t
    } = Va(
      l,
      u,
      d,
      O,
      $,
      F,
      x,
      J,
      v,
      Te,
      ie,
      we,
      Fe,
      E,
      xe,
      me,
      te,
      wt,
      H
    ), {
      rowsItemsComputed: Ye,
      rowsPerPageRef: re,
      updateRowsPerPage: St
    } = ar(
      ie,
      n,
      ee,
      B
    ), {
      totalItems: Ze,
      selectItemsComputed: It,
      totalItemsLength: Pe,
      toggleSelectAll: $t,
      toggleSelectItem: Ee,
      isProcessing: Bt,
      processProgress: At
    } = cr(
      Ve,
      m,
      ie,
      C,
      k,
      L,
      T,
      W,
      te,
      f,
      H
    ), {
      currentPaginationNumber: Y,
      maxPaginationNumber: Ce,
      isLastPage: ce,
      isFirstPage: de,
      nextPage: fe,
      prevPage: ge,
      updatePage: _e,
      updateCurrentPaginationNumber: Nt
    } = tr(
      s,
      ie,
      S,
      Pe,
      re,
      ee,
      xt
    ), {
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      multipleSelectStatus: Qe,
      pageItems: ve
    } = er(
      Y,
      Te,
      ie,
      C,
      re,
      It,
      E,
      Ze,
      Pe
    ), Z = b(() => Y.value === 0 ? 0 : (Y.value - 1) * re.value), {
      expandingItemIndexList: Ne,
      updateExpandingItemIndexList: Re,
      clearExpandingItemIndexList: Xe
    } = Ka(
      ve,
      Z,
      H
    ), {
      fixedHeaders: et,
      lastFixedColumn: Rt,
      fixedColumnsInfos: Mt,
      showShadow: tt
    } = Ga(
      ue,
      Ae
    ), {
      clickRow: at
    } = Ua(
      U,
      Te,
      E,
      H
    ), Lt = (c, R) => {
      i.value && R.preventDefault(), H("contextmenuRow", c, R);
    }, Tt = (c) => {
      const R = c.width ?? (et.value.length ? 100 : null);
      if (R) return `width: ${R}px; min-width: ${R}px;`;
    }, rt = (c, R = "th") => {
      if (!et.value.length) return;
      const g = Mt.value.find((A) => A.value === c);
      if (g)
        return `
            left: ${g.distance}px;
            z-index: ${R === "th" ? 3 : 1};
            position: sticky;
            background-color: ${R === "th" ? "none" : "inherit"};
        `;
    };
    return se(S, (c, R) => {
      Fe.value && c === !1 && R === !0 && (Nt(Fe.value.page), Xe());
    }), se(re, (c) => {
      ie.value ? kt(c) : _e(1);
    }), se([T, m], () => {
      ie.value || _e(1);
    }), se([Y, Ve, L, T, m], () => {
      Xe();
    }, { deep: !0 }), se(ve, (c) => {
      H("updatePageItems", c);
    }, { deep: !0 }), se(Ze, (c) => {
      H("updateTotalItems", c);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      clientItemsLength: Pe,
      maxPaginationNumber: Ce,
      currentPaginationNumber: Y,
      isLastPage: ce,
      isFirstPage: de,
      nextPage: fe,
      prevPage: ge,
      updatePage: _e,
      rowsPerPageOptions: Ye,
      rowsPerPageActiveOption: re,
      updateRowsPerPageActiveOption: St
    }), (c, R) => (p(), y("div", {
      ref_key: "dataTable",
      ref: Be,
      class: _(["relative w-full", [c.tableClassName]])
    }, [
      w("div", {
        ref_key: "tableBody",
        ref: Ae,
        class: _(["relative overflow-auto border border-gray-200 min-h-[180px]", [{ "shadow-sm": o(tt) }, c.tableBodyClass]])
      }, [
        w("table", {
          id: c.tableNodeId,
          class: "w-full border-collapse bg-white"
        }, [
          w("colgroup", null, [
            (p(!0), y(X, null, he(o(ue), (g, A) => (p(), y("col", {
              key: A,
              style: oe(Tt(g))
            }, null, 4))), 128))
          ]),
          o(h)["customize-headers"] ? M(c.$slots, "customize-headers", { key: 0 }) : o(ue).length && !c.hideHeader ? (p(), y("thead", {
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
              (p(!0), y(X, null, he(o(ue), (g, A) => (p(), y("th", {
                key: A,
                style: oe(rt(g.value)),
                class: _(["px-4 py-3 font-semibold tracking-wider group", [
                  {
                    "cursor-pointer hover:bg-gray-200": g.sortable,
                    "bg-gray-100": g.sortable && g.sortType === "none" && c.headerClassName === "" && c.headerClassName === "",
                    "bg-gray-200": (g.sortable && g.sortType === "desc" || g.sortType === "asc") && c.headerClassName === "",
                    "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": g.value === o(Rt)
                  },
                  typeof c.headerItemClassName == "string" ? c.headerItemClassName : c.headerItemClassName(g, A + 1),
                  `text-${c.headerTextDirection}`
                ]]),
                onClick: (I) => g.sortable && g.sortType ? o(Pt)(g.value, g.sortType) : null
              }, [
                g.text === "checkbox" && o(k) !== null ? (p(), ne(Yt, {
                  key: o(Qe),
                  status: o(Qe),
                  onChange: o($t)
                }, null, 8, ["status", "onChange"])) : (p(), y("div", Pr, [
                  o(h)[`header-${g.value}`] ? M(c.$slots, `header-${g.value}`, q({
                    key: 0,
                    ref_for: !0
                  }, g)) : o(h)[`header-${g.value.toLowerCase()}`] ? M(c.$slots, `header-${g.value.toLowerCase()}`, q({
                    key: 1,
                    ref_for: !0
                  }, g)) : o(h).header ? M(c.$slots, "header", q({
                    key: 2,
                    ref_for: !0
                  }, g)) : (p(), y("span", Cr, j(g.text), 1)),
                  g.sortable ? (p(), y("span", {
                    key: g.sortType ? g.sortType : "none",
                    class: _(["inline-flex transition-opacity duration-200", [g.sortType === "none" ? "opacity-0" : "opacity-100", "group-hover:opacity-100"]])
                  }, [
                    z(o(Na), {
                      class: _({ "transform rotate-180": g.sortType === "desc" })
                    }, null, 8, ["class"])
                  ], 2)) : D("", !0),
                  o(te) && o(Ct)(g.value) ? (p(), y("span", _r, j(o(_t)(g.value)), 1)) : D("", !0)
                ]))
              ], 14, kr))), 128))
            ], 2)
          ], 2)) : D("", !0),
          Ie.value ? M(c.$slots, "body", Se(q({ key: 2 }, o(ve)))) : o(Je).length ? (p(), y("tbody", Sr, [
            M(c.$slots, "body-prepend", Se(nt({
              items: o(ve),
              pagination: {
                isFirstPage: o(de),
                isLastPage: o(ce),
                currentPaginationNumber: o(Y),
                maxPaginationNumber: o(Ce),
                nextPage: o(fe),
                prevPage: o(ge)
              },
              headers: o(ue)
            }))),
            (p(!0), y(X, null, he(o(ve), (g, A) => (p(), y(X, {
              key: g.key || A
            }, [
              w("tr", {
                class: _(["transition-colors bg-white", [
                  { "even:bg-gray-50 odd:bg-white": c.alternating },
                  !c.noHover && "hover:bg-gray-100",
                  typeof c.bodyRowClassName == "string" ? c.bodyRowClassName : c.bodyRowClassName(g, A + 1),
                  { "divide-x divide-gray-200": c.borderCell }
                ]]),
                onClick: (I) => {
                  c.clickRowToExpand && o(Re)(A + Z.value, g, I), o(ke) && o(Ee)(g), o(at)(g, "single", I);
                },
                onDblclick: (I) => o(at)(g, "double", I),
                onContextmenu: (I) => Lt(g, I)
              }, [
                (p(!0), y(X, null, he(o(Je), (I, Ft) => (p(), y("td", {
                  key: Ft,
                  style: oe(rt(I, "td")),
                  class: _(["px-4 py-2", [
                    {
                      "cursor-pointer": I === "expand" && c.expandColumn === ""
                    },
                    typeof c.bodyItemClassName == "string" ? c.bodyItemClassName : c.bodyItemClassName(I, A + 1),
                    `text-${c.bodyTextDirection}`
                  ]]),
                  onClick: (ye) => I === "expand" && c.expandColumn === "" ? o(Re)(A + Z.value, g, ye) : null
                }, [
                  o(h)[`item-${I}`] ? M(c.$slots, `item-${I}`, q({
                    key: 0,
                    ref_for: !0
                  }, g)) : o(h)[`item-${I.toLowerCase()}`] ? M(c.$slots, `item-${I.toLowerCase()}`, q({
                    key: 1,
                    ref_for: !0
                  }, g)) : I === c.expandColumn ? M(c.$slots, "expand-button", {
                    key: 2,
                    item: g,
                    expanded: o(Ne).includes(Z.value + A),
                    toggle: (ye) => o(Re)(A + Z.value, g, ye)
                  }, () => [
                    w("button", {
                      onClick: gt((ye) => o(Re)(A + Z.value, g, ye), ["stop"]),
                      class: "inline-flex items-center"
                    }, [
                      z(o(Pa), {
                        class: _({ "transform -rotate-90": o(Ne).includes(Z.value + A) })
                      }, null, 8, ["class"])
                    ], 8, Br)
                  ]) : I === "expand" && c.expandColumn === "" ? (p(), ne(o(Ia), {
                    key: 3,
                    class: _({ "transform rotate-90": o(Ne).includes(Z.value + A) })
                  }, null, 8, ["class"])) : I === "checkbox" ? M(c.$slots, "selection-checkbox", q({
                    key: 4,
                    ref_for: !0
                  }, { item: g, index: A, toggleSelectItem: o(Ee), isItemSelected: g[I] }), () => [
                    z(ht, {
                      checked: g[I],
                      onChange: (ye) => o(Ee)(g)
                    }, null, 8, ["checked", "onChange"])
                  ]) : o(h).item ? M(c.$slots, "item", q({
                    key: 5,
                    ref_for: !0
                  }, { column: I, item: g })) : (p(), y(X, { key: 6 }, [
                    He(j(o(ir)(I, g)), 1)
                  ], 64))
                ], 14, $r))), 128))
              ], 42, Ir),
              J.value && o(Ne).includes(A + Z.value) ? (p(), y("tr", {
                key: 0,
                class: _([
                  { "bg-gray-50": (A + 1) % 2 === 0 },
                  typeof c.bodyExpandRowClassName == "string" ? c.bodyExpandRowClassName : c.bodyExpandRowClassName(g, A + 1)
                ])
              }, [
                w("td", {
                  colspan: o(ue).length,
                  class: "px-4 py-2"
                }, [
                  g.expandLoading ? (p(), ne(ua, {
                    key: 0,
                    class: "mb-4"
                  })) : D("", !0),
                  M(c.$slots, "expand", q({ ref_for: !0 }, g))
                ], 8, Ar)
              ], 2)) : D("", !0)
            ], 64))), 128)),
            M(c.$slots, "body-append", Se(nt({
              items: o(ve),
              pagination: {
                isFirstPage: o(de),
                isLastPage: o(ce),
                currentPaginationNumber: o(Y),
                maxPaginationNumber: o(Ce),
                nextPage: o(fe),
                prevPage: o(ge),
                updatePage: o(_e)
              },
              headers: o(ue)
            })))
          ])) : D("", !0)
        ], 8, wr),
        o(S) ? (p(), y("div", Nr, [
          w("div", Rr, [
            ae.value ? M(c.$slots, "loading", { key: 0 }) : (p(), ne(oa, { key: 1 }))
          ])
        ])) : D("", !0),
        !o(ve).length && !o(S) ? (p(), y("div", Mr, [
          M(c.$slots, "empty-message", {}, () => [
            He(j(c.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      c.hideFooter ? D("", !0) : (p(), y("div", {
        key: 0,
        class: _(["flex items-center justify-between px-4 py-3 bg-white", {
          "border border-gray-200 border-t-0": !0,
          "shadow-sm": o(tt)
        }])
      }, [
        w("div", Lr, [
          w("button", {
            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: R[0] || (R[0] = //@ts-ignore
            (...g) => o(ge) && o(ge)(...g)),
            disabled: o(de)
          }, [
            z(o(yt), {
              class: _({ "opacity-50": o(de) })
            }, null, 8, ["class"])
          ], 8, Tr),
          w("button", {
            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: R[1] || (R[1] = //@ts-ignore
            (...g) => o(fe) && o(fe)(...g)),
            disabled: o(ce)
          }, [
            z(o(mt), {
              class: _({ "opacity-50": o(ce) })
            }, null, 8, ["class"])
          ], 8, Fr)
        ]),
        w("div", Er, [
          c.hideRowsPerPage ? D("", !0) : (p(), y("div", Or, [
            He(j(c.rowsPerPageMessage) + " ", 1),
            z(ra, {
              modelValue: o(re),
              "onUpdate:modelValue": R[2] || (R[2] = (g) => Wt(re) ? re.value = g : null),
              "rows-items": o(Ye)
            }, null, 8, ["modelValue", "rows-items"])
          ])),
          c.hidePaginationInfo ? D("", !0) : (p(), y("div", Dr, [
            $e.value ? M(c.$slots, "pagination-info", Se(q({ key: 0 }, {
              currentPageFirstIndex: o(Oe),
              currentPageLastIndex: o(De),
              totalItemsLength: o(Pe),
              rowsOfPageSeparatorMessage: c.rowsOfPageSeparatorMessage
            }))) : (p(), y("span", jr, j(`${o(Oe)}–${o(De)}`) + " " + j(c.rowsOfPageSeparatorMessage) + " " + j(o(Pe)), 1))
          ])),
          N.value ? M(c.$slots, "pagination", Se(q({ key: 2 }, {
            isFirstPage: o(de),
            isLastPage: o(ce),
            currentPaginationNumber: o(Y),
            maxPaginationNumber: o(Ce),
            nextPage: o(fe),
            prevPage: o(ge)
          }))) : (p(), ne(Oa, {
            key: 3,
            "is-first-page": o(de),
            "is-last-page": o(ce),
            onClickNextPage: o(fe),
            onClickPrevPage: o(ge)
          }, Ut({ _: 2 }, [
            c.buttonsPagination ? {
              name: "buttonsPagination",
              fn: pt(() => [
                z(La, {
                  "current-pagination-number": o(Y),
                  "max-pagination-number": o(Ce),
                  onUpdatePage: o(_e)
                }, null, 8, ["current-pagination-number", "max-pagination-number", "onUpdatePage"])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["is-first-page", "is-last-page", "onClickNextPage", "onClickPrevPage"]))
        ])
      ], 2)),
      Ue(z(Wa, { progress: o(At) }, null, 8, ["progress"]), [
        [Ke, o(Bt)]
      ])
    ], 2));
  }
}), Hr = (e) => {
  e.component("DataTable", bt);
};
bt.install = Hr;
export {
  Wr as createFilter,
  bt as default,
  Hr as install
};
