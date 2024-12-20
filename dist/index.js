var jt = Object.defineProperty;
var Ht = (e, t, a) => t in e ? jt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var He = (e, t, a) => Ht(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as J, computed as x, inject as ke, openBlock as p, createElementBlock as m, normalizeClass as S, withModifiers as vt, createElementVNode as k, normalizeStyle as ie, unref as o, withDirectives as Ke, vShow as Ve, createBlock as le, ref as G, watch as oe, onMounted as pt, onBeforeUnmount as qt, toDisplayString as q, createVNode as W, Transition as zt, withCtx as bt, Fragment as ee, renderList as me, createCommentVNode as j, renderSlot as L, onUnmounted as Wt, toRefs as Ut, provide as nt, useSlots as Kt, mergeProps as z, normalizeProps as Be, guardReactiveProps as ot, createTextVNode as qe, isRef as Vt, createSlots as Gt } from "vue";
const Jt = ["checked", "disabled", "aria-checked"], Yt = {
  class: "h-4 w-4 text-white stroke-[3]",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Zt = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Qt = /* @__PURE__ */ J({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const t = e, a = x(() => t.checked), s = x(() => t.partial), l = ke("themeClasses");
    return (c, g) => (p(), m("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !c.disabled && "cursor-pointer group",
        c.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: g[0] || (g[0] = vt((r) => !c.disabled && c.$emit("change"), ["stop", "prevent"]))
    }, [
      k("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: a.value,
        disabled: c.disabled,
        "aria-checked": a.value
      }, null, 8, Jt),
      k("div", {
        class: S(["h-4 w-4 rounded transition-all duration-200 border", [
          // Base states
          a.value && !s.value && [
            "bg-theme border-theme",
            !c.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          s.value && [
            "bg-theme border-theme",
            !c.disabled && "group-hover:bg-theme-hover group-hover:border-theme-hover"
          ],
          !a.value && !s.value && [
            "border-gray-300 bg-white",
            !c.disabled && "group-hover:border-theme-light"
          ],
          // Focus states
          !c.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-theme-focus"
        ]]),
        style: ie(o(l).style)
      }, [
        Ke((p(), m("svg", Yt, g[1] || (g[1] = [
          k("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ve, a.value && !s.value]
        ]),
        Ke((p(), m("svg", Zt, g[2] || (g[2] = [
          k("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ve, s.value]
        ])
      ], 6)
    ], 2));
  }
}), ht = /* @__PURE__ */ J({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const a = t;
    return (s, l) => (p(), le(Qt, {
      checked: s.checked,
      disabled: s.disabled,
      partial: !1,
      onChange: l[0] || (l[0] = (c) => a("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), Xt = /* @__PURE__ */ J({
  __name: "MultipleSelectCheckBox",
  props: {
    status: {
      type: String,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const a = e, s = x(() => a.status === "allSelected"), l = x(() => a.status === "partSelected"), c = t;
    return (g, r) => (p(), le(ht, {
      checked: s.value,
      partial: l.value,
      disabled: e.disabled,
      onChange: r[0] || (r[0] = (i) => c("change", !s.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), ea = { class: "relative inline-block min-w-[70px]" }, ta = ["aria-expanded"], aa = { class: "block truncate" }, sa = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, ra = ["aria-selected", "onClick"], na = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-primary-600"
}, oa = /* @__PURE__ */ J({
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
    const a = e, s = t, l = G(!1), c = G(!1), g = x({
      get: () => a.modelValue,
      set: (y) => s("update:modelValue", y)
    }), r = ke("dataTable");
    oe(l, (y) => {
      if (y && (r != null && r.value)) {
        const P = window.innerHeight, C = r.value.getBoundingClientRect(), _ = P - (C.height + C.top);
        c.value = _ <= 100;
      }
    });
    const i = (y) => {
      g.value = y, l.value = !1;
    }, u = () => {
      l.value = !l.value;
    }, n = (y) => {
      y.target.closest(".relative") || (l.value = !1);
    }, b = (y) => {
      const P = y.relatedTarget;
      P != null && P.closest(".relative") || (l.value = !1);
    };
    return pt(() => {
      document.addEventListener("click", n);
    }), qt(() => {
      document.removeEventListener("click", n);
    }), (y, P) => (p(), m("div", ea, [
      k("button", {
        type: "button",
        class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          l.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
        ]]),
        onClick: u,
        "aria-haspopup": "listbox",
        "aria-expanded": l.value
      }, [
        k("span", aa, q(g.value), 1),
        k("span", sa, [
          (p(), m("svg", {
            class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": l.value }]),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, P[0] || (P[0] = [
            k("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 9l-7 7-7-7"
            }, null, -1)
          ]), 2))
        ])
      ], 10, ta),
      W(zt, {
        "enter-active-class": "transition duration-100 ease-out",
        "enter-from-class": "transform scale-95 opacity-0",
        "enter-to-class": "transform scale-100 opacity-100",
        "leave-active-class": "transition duration-75 ease-in",
        "leave-from-class": "transform scale-100 opacity-100",
        "leave-to-class": "transform scale-95 opacity-0"
      }, {
        default: bt(() => [
          l.value ? (p(), m("ul", {
            key: 0,
            class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": c.value }]),
            tabindex: "-1",
            role: "listbox",
            onFocusout: b
          }, [
            (p(!0), m(ee, null, me(e.rowsItems, (C) => (p(), m("li", {
              key: C,
              class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                C === g.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
              ]]),
              role: "option",
              "aria-selected": C === g.value,
              onClick: (_) => i(C)
            }, [
              k("span", {
                class: S(["block", { "font-medium": C === g.value }])
              }, q(C), 3),
              C === g.value ? (p(), m("span", na, P[1] || (P[1] = [
                k("svg", {
                  class: "h-4 w-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor"
                }, [
                  k("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M5 13l4 4L19 7"
                  })
                ], -1)
              ]))) : j("", !0)
            ], 10, ra))), 128))
          ], 34)) : j("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), la = { class: "inline-flex relative w-[60px] h-[60px]" }, ia = /* @__PURE__ */ J({
  __name: "Loading",
  setup(e) {
    const t = ke("themeClasses");
    return (a, s) => (p(), m("div", la, [
      (p(), m(ee, null, me(4, (l) => k("div", {
        key: l,
        class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(l - 1) * 150}`]]),
        style: ie({
          borderTopColor: o(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), ue = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, l] of t)
    a[s] = l;
  return a;
}, ua = /* @__PURE__ */ ue(ia, [["__scopeId", "data-v-e9a27991"]]), ca = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, da = /* @__PURE__ */ J({
  __name: "LoadingLine",
  setup(e) {
    const t = ke("themeClasses");
    return (a, s) => (p(), m("div", ca, [
      k("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ie({ backgroundColor: o(t).hex })
      }, null, 4)
    ]));
  }
}), fa = /* @__PURE__ */ ue(da, [["__scopeId", "data-v-cbdc3562"]]), ga = {}, va = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function pa(e, t) {
  return p(), m("svg", va, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const mt = /* @__PURE__ */ ue(ga, [["render", pa]]), ba = {}, ha = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function ma(e, t) {
  return p(), m("svg", ha, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const yt = /* @__PURE__ */ ue(ba, [["render", ma]]), ya = {}, xa = { class: "px-3 py-1.5" };
function wa(e, t) {
  return p(), m("span", xa, t[0] || (t[0] = [
    k("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      k("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const ka = /* @__PURE__ */ ue(ya, [["render", wa]]), Pa = {}, Ca = {
  class: "w-4 h-4 transition-transform duration-200",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Sa(e, t) {
  return p(), m("svg", Ca, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const _a = /* @__PURE__ */ ue(Pa, [["render", Sa]]), Ia = {}, $a = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ba(e, t) {
  return p(), m("svg", $a, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Aa = /* @__PURE__ */ ue(Ia, [["render", Ba]]), Na = {}, Ra = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ma(e, t) {
  return p(), m("svg", Ra, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const La = /* @__PURE__ */ ue(Na, [["render", Ma]]), Ta = {
  class: "inline-flex rounded-md shadow-sm",
  role: "navigation",
  "aria-label": "Pagination"
}, Fa = ["onClick"], he = 7, Ea = /* @__PURE__ */ J({
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
    const a = e, s = t, l = ke("themeClasses"), c = (r) => {
      r.type === "button" && !r.active && s("updatePage", r.page);
    }, g = x(() => {
      const r = [], { maxPaginationNumber: i, currentPaginationNumber: u } = a;
      if (i <= he) {
        for (let n = 1; n <= i; n += 1)
          r.push({
            type: "button",
            page: n,
            active: n === u,
            activePrev: n + 1 === u
          });
        return r;
      }
      if ([1, 2, i, i - 1].includes(u))
        for (let n = 1; n <= he; n += 1)
          if (n <= 3)
            r.push({
              type: "button",
              page: n,
              active: n === u,
              activePrev: n + 1 === u
            });
          else if (n === 4)
            r.push({ type: "omission" });
          else {
            const b = i - (he - n);
            r.push({
              type: "button",
              page: b,
              active: b === u,
              activePrev: b + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let n = 1; n <= he; n += 1)
          n <= 5 ? r.push({
            type: "button",
            page: n,
            active: n === u,
            activePrev: n + 1 === u
          }) : n === 6 ? r.push({ type: "omission" }) : r.push({
            type: "button",
            page: i,
            active: i === u,
            activePrev: !1
          });
      else if ([i - 2, i - 3].includes(u))
        for (let n = 1; n <= he; n += 1)
          if (n === 1)
            r.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (n === 2)
            r.push({ type: "omission" });
          else {
            const b = i - (he - n);
            r.push({
              type: "button",
              page: b,
              active: b === u,
              activePrev: b + 1 === u
            });
          }
      else
        for (let n = 1; n <= he; n += 1)
          if (n === 1)
            r.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (n === 2 || n === 6)
            r.push({ type: "omission" });
          else if (n === 7)
            r.push({
              type: "button",
              page: i,
              active: i === u,
              activePrev: !1
            });
          else {
            const b = 4 - n, y = u - b;
            r.push({
              type: "button",
              page: y,
              active: y === u,
              activePrev: y + 1 === u
            });
          }
      return r;
    });
    return (r, i) => (p(), m("div", Ta, [
      (p(!0), m(ee, null, me(g.value, (u, n) => (p(), m("div", {
        key: n,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          n === 0 && "rounded-l-md",
          // Last item styles
          n === g.value.length - 1 && "rounded-r-md",
          // Button specific styles
          u.type === "button" && [
            "border border-gray-300",
            // Active state
            u.active ? [
              "z-10",
              o(l).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${o(l).tailwindName}-500`,
              `focus:border-${o(l).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !u.active && "cursor-pointer",
            // Connect borders for middle buttons
            n !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            n !== 0 && "-ml-px"
          ]
        ]]),
        style: ie(o(l).style),
        onClick: (b) => c(u)
      }, [
        u.type === "button" ? (p(), m("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": u.active }])
        }, q(u.page), 3)) : (p(), le(o(ka), { key: 1 }))
      ], 14, Fa))), 128))
    ]));
  }
}), Oa = {
  class: "flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Da = ["disabled"], ja = ["disabled"], Ha = /* @__PURE__ */ J({
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
    const a = t;
    return (s, l) => (p(), m("div", Oa, [
      k("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isFirstPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isFirstPage,
        onClick: l[0] || (l[0] = (c) => a("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        W(o(yt), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Da),
      L(s.$slots, "buttonsPagination"),
      k("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border", [
          e.isLastPage ? [
            "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed",
            "hover:bg-gray-50"
          ] : [
            "border-gray-300 bg-white text-gray-500",
            "hover:bg-gray-50 hover:text-gray-700"
          ]
        ]]),
        disabled: e.isLastPage,
        onClick: l[1] || (l[1] = (c) => a("clickNextPage")),
        "aria-label": "Next page"
      }, [
        W(o(mt), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, ja)
    ]));
  }
}), qa = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, za = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, Wa = { class: "w-64" }, Ua = { class: "h-2 bg-gray-200 rounded" }, Ka = { class: "text-center text-sm text-gray-600" }, Va = /* @__PURE__ */ J({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    const t = ke("themeClasses");
    return (a, s) => (p(), m("div", qa, [
      k("div", za, [
        s[0] || (s[0] = k("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        k("div", Wa, [
          k("div", Ua, [
            k("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: ie({ width: `${a.progress}%`, backgroundColor: o(t).hex })
            }, null, 4)
          ])
        ]),
        k("div", Ka, q(Math.round(a.progress)) + "% ", 1)
      ])
    ]));
  }
});
function Ga(e, t, a, s) {
  return {
    clickRow: (c, g, r) => {
      if (e.value !== g) return;
      const i = { ...c };
      if (t.value) {
        const { checkbox: u } = c;
        delete i.checkbox, i.isSelected = u;
      }
      if (a.value) {
        const { index: u } = c;
        delete i.index, i.indexInCurrentPage = u;
      }
      s("clickRow", i, r);
    }
  };
}
function Ja(e, t, a) {
  const s = G([]);
  return {
    expandingItemIndexList: s,
    // 展開項的索引列表
    updateExpandingItemIndexList: (g, r, i) => {
      i.stopPropagation();
      const u = s.value.indexOf(g);
      if (u !== -1)
        s.value.splice(u, 1);
      else {
        const n = e.value.findIndex((b) => JSON.stringify(b) === JSON.stringify(r));
        a("expandRow", t.value + n, r), s.value.push(t.value + n);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      s.value = [];
    }
    // 清空展開列表的方法
  };
}
function Ya(e, t) {
  const a = x(() => e.value.filter((r) => r.fixed)), s = x(() => a.value.length ? a.value[a.value.length - 1].value : ""), l = x(() => {
    if (!a.value.length) return [];
    const r = a.value.map((i) => i.width ?? 100);
    return a.value.map((i, u) => ({
      value: i.value,
      // 列標籤
      fixed: i.fixed ?? !0,
      // 是否固定
      width: i.width ?? 100,
      // 列寬度
      // 計算距離左側的距離
      distance: u === 0 ? 0 : r.reduce((n, b, y) => y < u ? n + b : n, 0)
    }));
  }), c = G(!1);
  let g = null;
  return pt(() => {
    const r = t.value;
    if (r) {
      const i = () => {
        c.value = r.scrollLeft > 0;
      };
      i(), r.addEventListener("scroll", i), g = () => {
        r.removeEventListener("scroll", i);
      };
    }
  }), Wt(() => {
    g && (g(), g = null);
  }), {
    fixedHeaders: a,
    lastFixedColumn: s,
    fixedColumnsInfos: l,
    showShadow: c
  };
}
function Za(e, t, a, s, l, c, g, r, i, u, n, b, y, P, C, _, I, T, R) {
  const E = x(() => g.value.length ? {
    hasFixedColumns: g.value.some((B) => B.fixed),
    fixedHeaders: g.value.filter((B) => B.fixed),
    unFixedHeaders: g.value.filter((B) => !B.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), H = G(
    Qa(C.value, _.value, I.value)
  ), { determineHeaderSortState: ce } = ts(n, y, I, H), ye = x(() => {
    const { fixedHeaders: B, unFixedHeaders: O } = E.value, F = [...B, ...O].map((D) => ({
      ...D,
      sortType: D.sortable ? ce(D.value) : void 0
    }));
    return [
      ...Object.values(te.value).filter(Boolean),
      ...F
    ];
  }), te = x(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: s.value || E.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: P.value && {
      text: e.value,
      value: "index",
      fixed: c.value || E.value.hasFixedColumns,
      width: i.value
    },
    expand: r.value && {
      text: "",
      value: "expand",
      fixed: l.value || E.value.hasFixedColumns,
      width: a.value
    }
  })), ae = x(
    () => ye.value.map((B) => B.value)
  ), Pe = (B, O) => {
    const F = O === "none" ? "asc" : O === "asc" ? "desc" : b.value ? "asc" : null;
    if (n.value) {
      T(B, F);
      return;
    }
    const D = I.value ? Xa(B, F, H.value) : es(B, F);
    H.value = D, R("updateSort", { sortType: F, sortBy: B });
  }, Ce = x(() => (B) => {
    var F, D;
    const O = n.value ? (F = y.value) == null ? void 0 : F.sortBy : (D = H.value) == null ? void 0 : D.sortBy;
    return Array.isArray(O) && O.includes(B);
  }), U = x(() => (B) => {
    var F, D;
    const O = n.value ? (F = y.value) == null ? void 0 : F.sortBy : (D = H.value) == null ? void 0 : D.sortBy;
    return Array.isArray(O) ? O.indexOf(B) + 1 : !1;
  });
  return {
    clientSortOptions: H,
    headerColumns: ae,
    headersForRender: ye,
    updateSortField: Pe,
    isMultiSorting: Ce,
    getMultiSortNumber: U
  };
}
function Qa(e, t, a) {
  return a && Array.isArray(e) && Array.isArray(t) ? {
    sortBy: e,
    sortDesc: t.map((s) => s === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: t === "desc"
  } : null;
}
const Xa = (e, t, a) => {
  if (!(a != null && a.sortBy) || !Array.isArray(a.sortBy) || !Array.isArray(a.sortDesc))
    return t === null ? null : {
      sortBy: [e],
      sortDesc: [t === "desc"]
    };
  const s = a.sortBy.indexOf(e), l = [...a.sortBy], c = [...a.sortDesc];
  return s === -1 && t !== null ? (l.push(e), c.push(t === "desc")) : t === null ? (l.splice(s, 1), c.splice(s, 1)) : c[s] = t === "desc", { sortBy: l, sortDesc: c };
}, es = (e, t) => t === null ? null : {
  sortBy: e,
  sortDesc: t === "desc"
};
function ts(e, t, a, s) {
  const l = (r) => !e.value || !t.value ? c(r) : g(r), c = (r) => {
    if (!s.value) return "none";
    const { sortBy: i, sortDesc: u } = s.value;
    if (a.value && Array.isArray(i) && Array.isArray(u)) {
      const n = i.indexOf(r);
      return n !== -1 ? u[n] ? "desc" : "asc" : "none";
    }
    return r === i ? u ? "desc" : "asc" : "none";
  }, g = (r) => {
    const { sortBy: i, sortType: u } = t.value;
    if (a.value && Array.isArray(i) && Array.isArray(u)) {
      const n = i.indexOf(r);
      return n !== -1 ? u[n] : "none";
    }
    return r === i && u ? u : "none";
  };
  return {
    determineHeaderSortState: l
  };
}
class as {
  constructor() {
    He(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    He(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(t) {
    let a = this.itemKeyCache.get(t);
    if (!a) {
      const { checkbox: s, index: l, ...c } = t;
      a = Object.entries(c).sort(([g], [r]) => g.localeCompare(r)).map(([g, r]) => `${g}:${r}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ss(e, t, a, s, l, c, g, r, i) {
  const u = new as(), n = x(
    () => (e.value - 1) * l.value + 1
  ), b = x(() => a.value ? Math.min(
    i.value,
    e.value * l.value
  ) : Math.min(
    r.value.length,
    e.value * l.value
  )), y = x(() => a.value ? s.value : r.value.slice(
    n.value - 1,
    b.value
  )), P = x(() => g.value ? y.value.map((I, T) => ({
    index: n.value + T,
    ...I
  })) : y.value), C = x(() => c.value.length === 0 || !c.value.some(
    (T) => r.value.some(
      (R) => u.getItemKey(T) === u.getItemKey(R)
    )
  ) ? "noneSelected" : c.value.length === r.value.length && c.value.every(
    (R) => r.value.some(
      (E) => u.getItemKey(R) === u.getItemKey(E)
    )
  ) ? "allSelected" : "partSelected"), _ = x(() => {
    if (!t.value)
      return P.value;
    switch (C.value) {
      case "allSelected":
        return P.value.map((I) => ({
          checkbox: !0,
          ...I
        }));
      case "noneSelected":
        return P.value.map((I) => ({
          checkbox: !1,
          ...I
        }));
      default:
        return P.value.map((I) => ({
          checkbox: c.value.some(
            (R) => u.getItemKey(I) === u.getItemKey(R)
          ),
          ...I
        }));
    }
  });
  return {
    currentPageFirstIndex: n,
    currentPageLastIndex: b,
    multipleSelectStatus: C,
    pageItems: _
  };
}
function rs(e, t, a, s, l, c, g) {
  const r = G(c.value ? c.value.page : e.value), i = x(() => Math.ceil(s.value / l.value)), u = x(() => i.value === 0 || r.value === i.value), n = x(() => r.value === 1);
  return {
    currentPaginationNumber: r,
    maxPaginationNumber: i,
    isLastPage: u,
    isFirstPage: n,
    nextPage: () => {
      if (s.value !== 0 && !u.value && !a.value)
        if (t.value) {
          const _ = r.value + 1;
          g(_);
        } else
          r.value += 1;
    },
    prevPage: () => {
      if (s.value !== 0 && !n.value && !a.value)
        if (t.value) {
          const _ = r.value - 1;
          g(_);
        } else
          r.value -= 1;
    },
    updatePage: (_) => {
      a.value || (t.value ? g(_) : r.value = _);
    },
    updateCurrentPaginationNumber: (_) => {
      r.value = _;
    }
  };
}
function ns(e, t, a, s) {
  var r;
  const l = x(() => !e.value && t.value.findIndex((i) => i === s.value) === -1 ? [s.value, ...t.value] : t.value), c = G(((r = a.value) == null ? void 0 : r.rowsPerPage) ?? s.value);
  return {
    rowsItemsComputed: l,
    // 計算後的每頁行數選項
    rowsPerPageRef: c,
    // 每頁行數
    updateRowsPerPage: (i) => {
      c.value = i;
    }
    // 更新每頁行數
  };
}
function os(e, t, a) {
  const s = x({
    get: () => {
      if (e.value) {
        const { page: r, rowsPerPage: i, sortBy: u, sortType: n } = e.value;
        return { page: r, rowsPerPage: i, sortBy: u ?? null, sortType: n ?? null };
      }
      return null;
    },
    set: (r) => {
      a("update:serverOptions", r);
    }
  });
  return {
    serverOptionsComputed: s,
    updateServerOptionsPage: (r) => {
      s.value && (s.value = {
        ...s.value,
        page: r
      });
    },
    updateServerOptionsSort: (r, i) => {
      if (s.value)
        if (t.value && Array.isArray(s.value.sortBy) && Array.isArray(s.value.sortType)) {
          const u = s.value.sortBy.findIndex((n) => n === r);
          u === -1 && i !== null && (s.value.sortBy.push(r), s.value.sortType.push(i)), i === null ? (s.value.sortBy.splice(u, 1), s.value.sortType.splice(u, 1)) : s.value.sortType[u] = i;
        } else
          s.value = {
            ...s.value,
            sortBy: i !== null ? r : null,
            sortType: i
          };
    },
    updateServerOptionsRowsPerPage: (r) => {
      s.value && (s.value = {
        ...s.value,
        page: 1,
        rowsPerPage: r
      });
    }
  };
}
function ls(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function is(e) {
  return e.comparison === "in";
}
function us(e) {
  return typeof e.comparison == "function";
}
function cs(e) {
  return typeof e == "number" && !isNaN(e);
}
const Vs = {
  number(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  },
  string(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  },
  array(e, t) {
    return { field: e, comparison: "in", criteria: t };
  },
  custom(e, t, a) {
    return { field: e, comparison: t, criteria: a };
  }
};
function V(e, t) {
  if (e.includes(".")) {
    const a = e.split(".");
    let s = t;
    for (const l of a)
      if (s && typeof s == "object")
        s = s[l];
      else
        return "";
    return s ?? "";
  }
  return t[e] ?? "";
}
function ds(e, t) {
  const a = V(e, t);
  return Array.isArray(a) ? a.join(",") : a;
}
const lt = 1e3, it = /* @__PURE__ */ new WeakMap(), Le = (e) => {
  let t = it.get(e);
  if (!t) {
    const { checkbox: a, index: s, ...l } = e;
    t = JSON.stringify(l), it.set(e, t);
  }
  return t;
};
function fs(e, t, a, s) {
  const l = G({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  oe(t, (n) => {
    if (n === null) {
      l.value.selectedItems.clear(), l.value.itemsMap.clear();
      return;
    }
    const b = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Map();
    for (const P of n) {
      const C = Le(P);
      b.add(C), y.set(C, P);
    }
    l.value.selectedItems = b, l.value.itemsMap = y;
  }, { immediate: !0, deep: !0 });
  const c = async (n, b, y) => new Promise((P) => {
    requestAnimationFrame(() => {
      const C = new Set(l.value.selectedItems), _ = new Map(l.value.itemsMap);
      for (let I = 0; I < n.length; I++) {
        const T = n[I], R = Le(T);
        b ? (C.add(R), _.set(R, T)) : C.delete(R), l.value.processedCount = y + I + 1, l.value.visualProgress = l.value.processedCount / l.value.totalCount * 100;
      }
      l.value.selectedItems = C, l.value.itemsMap = _, P();
    });
  }), g = async (n) => {
    if (!l.value.selectionInProgress)
      try {
        if (l.value.selectionInProgress = !0, l.value.processedCount = 0, l.value.totalCount = e.value.length, l.value.visualProgress = 0, !n) {
          l.value.selectedItems.clear(), l.value.itemsMap.clear(), s("update:itemsSelected", []), l.value.visualProgress = 100;
          return;
        }
        const b = e.value;
        for (let y = 0; y < b.length; y += lt) {
          const C = b.slice(y, Math.min(y + lt, b.length)).filter((_) => !a(_));
          await c(C, n, y), await new Promise((_) => setTimeout(_, 0));
        }
        s("update:itemsSelected", i.value), n && s("selectAll");
      } finally {
        l.value.selectionInProgress = !1;
      }
  }, r = (n) => {
    const b = Le(n), y = { ...n };
    delete y.checkbox, delete y.index;
    const P = new Set(l.value.selectedItems), C = new Map(l.value.itemsMap);
    P.has(b) ? (P.delete(b), s("deselectRow", y)) : (P.add(b), C.set(b, y), s("selectRow", y)), l.value.selectedItems = P, l.value.itemsMap = C, s("update:itemsSelected", Array.from(C.values()).filter((I) => P.has(Le(I))));
  }, i = x(() => l.value.selectedItems.size === 0 ? [] : Array.from(l.value.itemsMap.entries()).filter(([n]) => l.value.selectedItems.has(n)).map(([, n]) => n)), u = x(() => l.value.visualProgress);
  return {
    selectedItems: i,
    toggleSelectAll: g,
    toggleSelectItem: r,
    isProcessing: x(() => l.value.selectionInProgress),
    selectionProgress: u
  };
}
function gs(e, t, a, s, l, c, g, r, i, u, n, b) {
  const y = /* @__PURE__ */ new WeakMap(), P = (v) => {
    let h = y.get(v);
    return h || (typeof c.value == "string" && c.value !== "" ? h = String(V(c.value, v)) : Array.isArray(c.value) ? h = c.value.map((w) => String(V(w, v))).join(" ") : h = Object.values(v).map(String).join(" "), y.set(v, h)), h;
  }, C = x(() => {
    if (!a.value && g.value !== "") {
      const v = new RegExp(g.value, "i");
      return s.value.filter((h) => v.test(P(h)));
    }
    return s.value;
  }), _ = (v, h) => {
    const w = cs(v) ? v : parseFloat(String(v));
    if (isNaN(w)) return !1;
    if (h.comparison === "between" && Array.isArray(h.criteria)) {
      const [Y, se] = h.criteria;
      return w >= Y && w <= se;
    }
    const N = h.criteria;
    switch (h.comparison) {
      case ">":
        return w > N;
      case ">=":
        return w >= N;
      case "<":
        return w < N;
      case "<=":
        return w <= N;
      default:
        return !1;
    }
  }, I = x(() => {
    var v;
    return (v = t.value) != null && v.length ? C.value.filter(
      (h) => t.value.every((w) => {
        const N = V(w.field, h);
        return us(w) ? w.comparison(N, w.criteria) : ls(w) ? _(N, w) : is(w) ? w.criteria.includes(N) : w.comparison === "=" ? N === w.criteria : N !== w.criteria;
      })
    ) : C.value;
  }), T = (v, h, w) => v === h ? 0 : v == null ? 1 : h == null ? -1 : v < h ? w ? 1 : -1 : w ? -1 : 1, R = (v, h, w, N) => N < 0 ? v : R(v, h, w, N - 1).sort((Y, se) => {
    if (!h.slice(0, N).every((xe) => V(xe, Y) === V(xe, se))) return 0;
    const Se = h[N], Ne = V(Se, Y), K = V(Se, se);
    return T(Ne, K, w[N]);
  }), E = x(() => {
    if (a.value) return s.value;
    if (!e.value) return I.value;
    const { sortBy: v, sortDesc: h } = e.value, w = [...I.value];
    return i.value && Array.isArray(v) && Array.isArray(h) ? v.length ? R(w, v, h, v.length - 1) : w : w.sort((N, Y) => {
      const se = V(v, N), Ae = V(v, Y);
      return T(se, Ae, h);
    });
  }), H = x(() => a.value ? r.value : E.value.length), ce = x(() => a.value ? !1 : (a.value ? r.value : s.value.length) >= u.value), {
    selectedItems: ye,
    toggleSelectAll: te,
    toggleSelectItem: ae,
    isProcessing: Pe,
    selectionProgress: Ce
  } = fs(E, l, n, b), U = x({
    get: () => l.value ?? [],
    set: (v) => {
      b("update:itemsSelected", v);
    }
  }), B = (v) => v.filter((h) => !n(h)), O = (v) => {
    U.value = v ? B(E.value) : [], v && b("selectAll");
  }, F = (v) => {
    const h = v.checkbox;
    if (delete v.checkbox, delete v.index, h)
      U.value = U.value.filter(
        (w) => JSON.stringify(w) !== JSON.stringify(v)
      ), b("deselectRow", v);
    else {
      const w = U.value;
      w.unshift(v), U.value = w, b("selectRow", v);
    }
  };
  return {
    totalItems: E,
    selectItemsComputed: U,
    totalItemsLength: H,
    toggleSelectAll: (v) => {
      if (!E.value.every((w) => n(w)))
        if (ce.value) {
          b("updateSelectionStatus", !0);
          try {
            te(v), b("update:itemsSelected", v ? Array.from(ye.value) : []), v && b("selectAll");
          } finally {
            b("updateSelectionStatus", !1);
          }
        } else
          O(v);
    },
    toggleSelectItem: (v) => {
      n(v) || (ce.value ? ae(v) : F(v));
    },
    isProcessing: x(() => ce.value && Pe.value),
    processProgress: Ce
  };
}
function vs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ze = {}, We = {}, Te = { exports: {} }, ut;
function ps() {
  if (ut) return Te.exports;
  ut = 1;
  var e = String, t = function() {
    return { isColorSupported: !1, reset: e, bold: e, dim: e, italic: e, underline: e, inverse: e, hidden: e, strikethrough: e, black: e, red: e, green: e, yellow: e, blue: e, magenta: e, cyan: e, white: e, gray: e, bgBlack: e, bgRed: e, bgGreen: e, bgYellow: e, bgBlue: e, bgMagenta: e, bgCyan: e, bgWhite: e, blackBright: e, redBright: e, greenBright: e, yellowBright: e, blueBright: e, magentaBright: e, cyanBright: e, whiteBright: e, bgBlackBright: e, bgRedBright: e, bgGreenBright: e, bgYellowBright: e, bgBlueBright: e, bgMagentaBright: e, bgCyanBright: e, bgWhiteBright: e };
  };
  return Te.exports = t(), Te.exports.createColors = t, Te.exports;
}
var ct;
function bs() {
  return ct || (ct = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, u) {
      for (var n in u) Object.defineProperty(i, n, {
        enumerable: !0,
        get: u[n]
      });
    }
    t(e, {
      dim: function() {
        return g;
      },
      default: function() {
        return r;
      }
    });
    const a = /* @__PURE__ */ s(/* @__PURE__ */ ps());
    function s(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    let l = /* @__PURE__ */ new Set();
    function c(i, u, n) {
      typeof process < "u" && process.env.JEST_WORKER_ID || n && l.has(n) || (n && l.add(n), console.warn(""), u.forEach((b) => console.warn(i, "-", b)));
    }
    function g(i) {
      return a.default.dim(i);
    }
    const r = {
      info(i, u) {
        c(a.default.bold(a.default.cyan("info")), ...Array.isArray(i) ? [
          i
        ] : [
          u,
          i
        ]);
      },
      warn(i, u) {
        c(a.default.bold(a.default.yellow("warn")), ...Array.isArray(i) ? [
          i
        ] : [
          u,
          i
        ]);
      },
      risk(i, u) {
        c(a.default.bold(a.default.magenta("risk")), ...Array.isArray(i) ? [
          i
        ] : [
          u,
          i
        ]);
      }
    };
  }(We)), We;
}
var dt;
function hs() {
  return dt || (dt = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const t = /* @__PURE__ */ a(bs());
    function a(c) {
      return c && c.__esModule ? c : {
        default: c
      };
    }
    function s({ version: c, from: g, to: r }) {
      t.default.warn(`${g}-color-renamed`, [
        `As of Tailwind CSS ${c}, \`${g}\` has been renamed to \`${r}\`.`,
        "Update your configuration file to silence this warning."
      ]);
    }
    const l = {
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
        return s({
          version: "v2.2",
          from: "lightBlue",
          to: "sky"
        }), this.sky;
      },
      get warmGray() {
        return s({
          version: "v3.0",
          from: "warmGray",
          to: "stone"
        }), this.stone;
      },
      get trueGray() {
        return s({
          version: "v3.0",
          from: "trueGray",
          to: "neutral"
        }), this.neutral;
      },
      get coolGray() {
        return s({
          version: "v3.0",
          from: "coolGray",
          to: "gray"
        }), this.gray;
      },
      get blueGray() {
        return s({
          version: "v3.0",
          from: "blueGray",
          to: "slate"
        }), this.slate;
      }
    };
  }(ze)), ze;
}
var Ue, ft;
function ms() {
  if (ft) return Ue;
  ft = 1;
  let e = hs();
  return Ue = (e.__esModule ? e : { default: e }).default, Ue;
}
var ys = ms();
const X = /* @__PURE__ */ vs(ys), Ge = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, xs = (e) => {
  const t = gt(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let a = { color: "indigo", variant: "DEFAULT" }, s = 1 / 0;
  const l = Object.entries(X).reduce((c, [g, r]) => {
    if (typeof r == "object") {
      const i = g;
      Object.entries(Ge).forEach(([u, n]) => {
        r[n] && (c[r[n]] = { color: i, variant: u });
      });
    }
    return c;
  }, {});
  return Object.entries(l).forEach(([c, g]) => {
    const r = gt(c);
    if (!r) return;
    const i = Ps(t, r);
    i < s && (s = i, a = g);
  }), a;
}, ws = (e, t) => {
  const a = Ge[t], s = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": X[e][a],
    "--theme-border": X[e][a],
    "--theme-hover": X[e][s],
    "--theme-active": X[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": X.gray[300],
    "--theme-light": X[e]["400"],
    "--theme-focus": X[e][a] + "80"
    // 添加 50% 透明度
  };
}, ks = (e) => {
  const { color: t, variant: a = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? xs(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : X[t][Ge[a]],
    tailwindName: t,
    style: ws(t, a)
  };
};
function gt(e) {
  const t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
  return t ? {
    r: parseInt(t[1], 16),
    g: parseInt(t[2], 16),
    b: parseInt(t[3], 16)
  } : null;
}
function Ps(e, t) {
  return Math.sqrt(
    Math.pow(t.r - e.r, 2) + Math.pow(t.g - e.g, 2) + Math.pow(t.b - e.b, 2)
  );
}
const Cs = ["id"], Ss = ["onClick"], _s = {
  key: 1,
  class: "items-center gap-2"
}, Is = {
  key: 3,
  class: "header-text"
}, $s = {
  key: 5,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, Bs = {
  key: 3,
  class: "text-sm divide-y divide-gray-200"
}, As = ["onClick", "onDblclick", "onContextmenu"], Ns = ["onClick"], Rs = ["onClick"], Ms = ["colspan"], Ls = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Ts = { class: "relative z-10" }, Fs = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Es = { class: "flex flex-1 justify-between sm:hidden" }, Os = ["disabled"], Ds = ["disabled"], js = { class: "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" }, Hs = {
  key: 0,
  class: "flex items-center gap-2 text-sm text-gray-700"
}, qs = {
  key: 1,
  class: "text-sm text-gray-700"
}, zs = { key: 1 }, xt = /* @__PURE__ */ J({
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
    disabledRows: { type: Function, default: () => !1 },
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
  setup(e, { expose: t, emit: a }) {
    const s = e, {
      checkboxColumnWidth: l,
      expandColumnWidth: c,
      indexColumnWidth: g,
      rowsItems: r,
      preventContextMenuRow: i,
      showIndexSymbol: u,
      currentPage: n,
      filterOptions: b,
      headers: y,
      itemsSelected: P,
      loading: C,
      items: _,
      rowsPerPage: I,
      searchField: T,
      searchValue: R,
      serverItemsLength: E,
      showIndex: H,
      sortBy: ce,
      sortType: ye,
      serverOptions: te,
      multiSort: ae,
      mustSort: Pe,
      clickEventType: Ce,
      clickRowToSelect: U,
      fixedExpand: B,
      fixedCheckbox: O,
      fixedIndex: F,
      batchSelectionThreshold: D,
      disabledRows: wt
    } = Ut(s), v = x(() => ks(s.theme));
    nt("themeClasses", v);
    const h = Kt(), w = x(() => !!h.pagination), N = x(() => !!h.loading), Y = x(() => !!h.expand), se = x(() => !!h.body), Ae = x(() => !!(h.paginationInfo || h["pagination-info"])), Se = G(null), Ne = G(null);
    nt("dataTable", Se);
    const K = a, xe = x(() => P.value !== null), de = x(() => te.value !== null), {
      serverOptionsComputed: Fe,
      updateServerOptionsPage: kt,
      updateServerOptionsSort: Pt,
      updateServerOptionsRowsPerPage: Ct
    } = os(
      te,
      ae,
      K
    ), {
      clientSortOptions: Je,
      headerColumns: Ye,
      headersForRender: fe,
      updateSortField: St,
      isMultiSorting: _t,
      getMultiSortNumber: It
    } = Za(
      u,
      l,
      c,
      O,
      B,
      F,
      y,
      Y,
      g,
      xe,
      de,
      Pe,
      Fe,
      H,
      ce,
      ye,
      ae,
      Pt,
      K
    ), {
      rowsItemsComputed: Ze,
      rowsPerPageRef: re,
      updateRowsPerPage: $t
    } = ns(
      de,
      r,
      te,
      I
    ), {
      totalItems: Qe,
      selectItemsComputed: Bt,
      totalItemsLength: _e,
      toggleSelectAll: At,
      toggleSelectItem: Ee,
      isProcessing: Nt,
      processProgress: Rt
    } = gs(
      Je,
      b,
      de,
      _,
      P,
      T,
      R,
      E,
      ae,
      D,
      s.disabledRows,
      K
    ), {
      currentPaginationNumber: Z,
      maxPaginationNumber: Ie,
      isLastPage: ge,
      isFirstPage: ve,
      nextPage: pe,
      prevPage: be,
      updatePage: $e,
      updateCurrentPaginationNumber: Mt
    } = rs(
      n,
      de,
      C,
      _e,
      re,
      te,
      kt
    ), {
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      multipleSelectStatus: Xe,
      pageItems: ne
    } = ss(
      Z,
      xe,
      de,
      _,
      re,
      Bt,
      H,
      Qe,
      _e
    ), Q = x(() => Z.value === 0 ? 0 : (Z.value - 1) * re.value), {
      expandingItemIndexList: Re,
      updateExpandingItemIndexList: Me,
      clearExpandingItemIndexList: et
    } = Ja(
      ne,
      Q,
      K
    ), {
      fixedHeaders: tt,
      lastFixedColumn: Lt,
      fixedColumnsInfos: Tt,
      showShadow: at
    } = Ya(
      fe,
      Ne
    ), {
      clickRow: st
    } = Ga(
      Ce,
      xe,
      H,
      K
    ), Ft = (d, M) => {
      i.value && M.preventDefault(), K("contextmenuRow", d, M);
    }, Et = (d) => {
      const M = d.width ?? (tt.value.length ? 100 : null);
      if (M) return `width: ${M}px; min-width: ${M}px;`;
    }, rt = (d, M = "th") => {
      if (!tt.value.length) return;
      const f = Tt.value.find((A) => A.value === d);
      if (f)
        return `
            left: ${f.distance}px;
            z-index: ${M === "th" ? 3 : 1};
            position: sticky;
            background-color: ${M === "th" ? "none" : "inherit"};
        `;
    }, je = (d) => typeof s.disabledRows == "function" ? s.disabledRows(d) : !1, Ot = x(() => ne.value.every((d) => s.disabledRows(d)));
    return oe(C, (d, M) => {
      Fe.value && d === !1 && M === !0 && (Mt(Fe.value.page), et());
    }), oe(re, (d) => {
      de.value ? Ct(d) : $e(1);
    }), oe([R, b], () => {
      de.value || $e(1);
    }), oe([Z, Je, T, R, b], () => {
      et();
    }, { deep: !0 }), oe(ne, (d) => {
      K("updatePageItems", d);
    }, { deep: !0 }), oe(Qe, (d) => {
      K("updateTotalItems", d);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      clientItemsLength: _e,
      maxPaginationNumber: Ie,
      currentPaginationNumber: Z,
      isLastPage: ge,
      isFirstPage: ve,
      nextPage: pe,
      prevPage: be,
      updatePage: $e,
      rowsPerPageOptions: Ze,
      rowsPerPageActiveOption: re,
      updateRowsPerPageActiveOption: $t
    }), (d, M) => (p(), m("div", {
      ref_key: "dataTable",
      ref: Se,
      class: S(["relative w-full", [d.tableClassName]])
    }, [
      k("div", {
        ref_key: "tableBody",
        ref: Ne,
        class: S(["relative overflow-auto border border-gray-200 min-h-[180px]", [{ "shadow-sm": o(at) }, d.tableBodyClass]])
      }, [
        k("table", {
          id: d.tableNodeId,
          class: "w-full border-collapse bg-white"
        }, [
          k("colgroup", null, [
            (p(!0), m(ee, null, me(o(fe), (f, A) => (p(), m("col", {
              key: A,
              style: ie(Et(f))
            }, null, 4))), 128))
          ]),
          o(h)["customize-headers"] ? L(d.$slots, "customize-headers", { key: 0 }) : o(fe).length && !d.hideHeader ? (p(), m("thead", {
            key: 1,
            class: S([
              "text-sm text-slate-700 uppercase bg-gray-100 text-nowrap",
              d.headerClassName,
              { "sticky top-0 z-10": d.fixedHeader }
            ])
          }, [
            k("tr", {
              class: S([{ "divide-x divide-gray-200": d.borderCell }])
            }, [
              (p(!0), m(ee, null, me(o(fe), (f, A) => (p(), m("th", {
                key: A,
                style: ie(rt(f.value)),
                class: S(["px-4 py-3 font-semibold tracking-wider group", [
                  {
                    "cursor-pointer hover:bg-gray-200": f.sortable,
                    "bg-gray-100": f.sortable && f.sortType === "none" && d.headerClassName === "" && d.headerClassName === "",
                    "bg-gray-200": (f.sortable && f.sortType === "desc" || f.sortType === "asc") && d.headerClassName === "",
                    "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": f.value === o(Lt)
                  },
                  typeof d.headerItemClassName == "string" ? d.headerItemClassName : d.headerItemClassName(f, A + 1),
                  `text-${d.headerTextDirection}`
                ]]),
                onClick: ($) => f.sortable && f.sortType ? o(St)(f.value, f.sortType) : null
              }, [
                f.text === "checkbox" && o(P) !== null ? (p(), le(Xt, {
                  disabled: Ot.value,
                  key: o(Xe),
                  status: o(Xe),
                  onChange: o(At)
                }, null, 8, ["disabled", "status", "onChange"])) : (p(), m("div", _s, [
                  o(h)[`header-${f.value}`] ? L(d.$slots, `header-${f.value}`, z({
                    key: 0,
                    ref_for: !0
                  }, f)) : o(h)[`header-${f.value.toLowerCase()}`] ? L(d.$slots, `header-${f.value.toLowerCase()}`, z({
                    key: 1,
                    ref_for: !0
                  }, f)) : o(h).header ? L(d.$slots, "header", z({
                    key: 2,
                    ref_for: !0
                  }, f)) : (p(), m("span", Is, q(f.text), 1)),
                  f.sortable ? (p(), m("span", {
                    key: f.sortType ? f.sortType : "none",
                    class: S(["inline-flex transition-opacity duration-200", [f.sortType === "none" ? "opacity-0" : "opacity-100", "group-hover:opacity-100"]])
                  }, [
                    W(o(La), {
                      class: S({ "transform rotate-180": f.sortType === "desc" })
                    }, null, 8, ["class"])
                  ], 2)) : j("", !0),
                  o(ae) && o(_t)(f.value) ? (p(), m("span", $s, q(o(It)(f.value)), 1)) : j("", !0)
                ]))
              ], 14, Ss))), 128))
            ], 2)
          ], 2)) : j("", !0),
          se.value ? L(d.$slots, "body", Be(z({ key: 2 }, o(ne)))) : o(Ye).length ? (p(), m("tbody", Bs, [
            L(d.$slots, "body-prepend", Be(ot({
              items: o(ne),
              pagination: {
                isFirstPage: o(ve),
                isLastPage: o(ge),
                currentPaginationNumber: o(Z),
                maxPaginationNumber: o(Ie),
                nextPage: o(pe),
                prevPage: o(be)
              },
              headers: o(fe)
            }))),
            (p(!0), m(ee, null, me(o(ne), (f, A) => (p(), m(ee, {
              key: f.key || A
            }, [
              k("tr", {
                class: S(["transition-colors bg-white", [
                  { "even:bg-gray-50 odd:bg-white": d.alternating },
                  !d.noHover && "hover:bg-gray-100",
                  typeof d.bodyRowClassName == "string" ? d.bodyRowClassName : d.bodyRowClassName(f, A + 1),
                  { "divide-x divide-gray-200": d.borderCell }
                ]]),
                onClick: ($) => {
                  d.clickRowToExpand && o(Me)(A + Q.value, f, $), o(U) && !je(f) && o(Ee)(f), o(st)(f, "single", $);
                },
                onDblclick: ($) => o(st)(f, "double", $),
                onContextmenu: ($) => Ft(f, $)
              }, [
                (p(!0), m(ee, null, me(o(Ye), ($, Dt) => (p(), m("td", {
                  key: Dt,
                  style: ie(rt($, "td")),
                  class: S(["px-4 py-2", [
                    {
                      "cursor-pointer": $ === "expand" && d.expandColumn === ""
                    },
                    typeof d.bodyItemClassName == "string" ? d.bodyItemClassName : d.bodyItemClassName($, A + 1),
                    `text-${d.bodyTextDirection}`
                  ]]),
                  onClick: (we) => $ === "expand" && d.expandColumn === "" ? o(Me)(A + Q.value, f, we) : null
                }, [
                  o(h)[`item-${$}`] ? L(d.$slots, `item-${$}`, z({
                    key: 0,
                    ref_for: !0
                  }, f)) : o(h)[`item-${$.toLowerCase()}`] ? L(d.$slots, `item-${$.toLowerCase()}`, z({
                    key: 1,
                    ref_for: !0
                  }, f)) : $ === d.expandColumn ? L(d.$slots, "expand-button", {
                    key: 2,
                    item: f,
                    expanded: o(Re).includes(Q.value + A),
                    toggle: (we) => o(Me)(A + Q.value, f, we)
                  }, () => [
                    k("button", {
                      onClick: vt((we) => o(Me)(A + Q.value, f, we), ["stop"]),
                      class: "inline-flex items-center"
                    }, [
                      W(o(_a), {
                        class: S({ "transform -rotate-90": o(Re).includes(Q.value + A) })
                      }, null, 8, ["class"])
                    ], 8, Rs)
                  ]) : $ === "expand" && d.expandColumn === "" ? (p(), le(o(Aa), {
                    key: 3,
                    class: S({ "transform rotate-90": o(Re).includes(Q.value + A) })
                  }, null, 8, ["class"])) : $ === "checkbox" ? L(d.$slots, "selection-checkbox", z({
                    key: 4,
                    ref_for: !0
                  }, { item: f, index: A, toggleSelectItem: o(Ee), isItemSelected: f[$], isItemDisabled: je(f) }), () => [
                    W(ht, {
                      checked: f[$],
                      onChange: (we) => o(Ee)(f),
                      disabled: je(f)
                    }, null, 8, ["checked", "onChange", "disabled"])
                  ]) : o(h).item ? L(d.$slots, "item", z({
                    key: 5,
                    ref_for: !0
                  }, { column: $, item: f })) : (p(), m(ee, { key: 6 }, [
                    qe(q(o(ds)($, f)), 1)
                  ], 64))
                ], 14, Ns))), 128))
              ], 42, As),
              Y.value && o(Re).includes(A + Q.value) ? (p(), m("tr", {
                key: 0,
                class: S([
                  { "bg-gray-50": (A + 1) % 2 === 0 },
                  typeof d.bodyExpandRowClassName == "string" ? d.bodyExpandRowClassName : d.bodyExpandRowClassName(f, A + 1)
                ])
              }, [
                k("td", {
                  colspan: o(fe).length,
                  class: "px-4 py-2"
                }, [
                  f.expandLoading ? (p(), le(fa, {
                    key: 0,
                    class: "mb-4"
                  })) : j("", !0),
                  L(d.$slots, "expand", z({ ref_for: !0 }, f))
                ], 8, Ms)
              ], 2)) : j("", !0)
            ], 64))), 128)),
            L(d.$slots, "body-append", Be(ot({
              items: o(ne),
              pagination: {
                isFirstPage: o(ve),
                isLastPage: o(ge),
                currentPaginationNumber: o(Z),
                maxPaginationNumber: o(Ie),
                nextPage: o(pe),
                prevPage: o(be),
                updatePage: o($e)
              },
              headers: o(fe)
            })))
          ])) : j("", !0)
        ], 8, Cs),
        o(C) ? (p(), m("div", Ls, [
          k("div", Ts, [
            N.value ? L(d.$slots, "loading", { key: 0 }) : (p(), le(ua, { key: 1 }))
          ])
        ])) : j("", !0),
        !o(ne).length && !o(C) ? (p(), m("div", Fs, [
          L(d.$slots, "empty-message", {}, () => [
            qe(q(d.emptyMessage), 1)
          ])
        ])) : j("", !0)
      ], 2),
      d.hideFooter ? j("", !0) : (p(), m("div", {
        key: 0,
        class: S(["flex items-center justify-between px-4 py-3 bg-white", {
          "border border-gray-200 border-t-0": !0,
          "shadow-sm": o(at)
        }])
      }, [
        k("div", Es, [
          k("button", {
            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: M[0] || (M[0] = //@ts-ignore
            (...f) => o(be) && o(be)(...f)),
            disabled: o(ve)
          }, [
            W(o(yt), {
              class: S({ "opacity-50": o(ve) })
            }, null, 8, ["class"])
          ], 8, Os),
          k("button", {
            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: M[1] || (M[1] = //@ts-ignore
            (...f) => o(pe) && o(pe)(...f)),
            disabled: o(ge)
          }, [
            W(o(mt), {
              class: S({ "opacity-50": o(ge) })
            }, null, 8, ["class"])
          ], 8, Ds)
        ]),
        k("div", js, [
          d.hideRowsPerPage ? j("", !0) : (p(), m("div", Hs, [
            qe(q(d.rowsPerPageMessage) + " ", 1),
            W(oa, {
              modelValue: o(re),
              "onUpdate:modelValue": M[2] || (M[2] = (f) => Vt(re) ? re.value = f : null),
              "rows-items": o(Ze)
            }, null, 8, ["modelValue", "rows-items"])
          ])),
          d.hidePaginationInfo ? j("", !0) : (p(), m("div", qs, [
            Ae.value ? L(d.$slots, "pagination-info", Be(z({ key: 0 }, {
              currentPageFirstIndex: o(Oe),
              currentPageLastIndex: o(De),
              totalItemsLength: o(_e),
              rowsOfPageSeparatorMessage: d.rowsOfPageSeparatorMessage
            }))) : (p(), m("span", zs, q(`${o(Oe)}–${o(De)}`) + " " + q(d.rowsOfPageSeparatorMessage) + " " + q(o(_e)), 1))
          ])),
          w.value ? L(d.$slots, "pagination", Be(z({ key: 2 }, {
            isFirstPage: o(ve),
            isLastPage: o(ge),
            currentPaginationNumber: o(Z),
            maxPaginationNumber: o(Ie),
            nextPage: o(pe),
            prevPage: o(be)
          }))) : (p(), le(Ha, {
            key: 3,
            "is-first-page": o(ve),
            "is-last-page": o(ge),
            onClickNextPage: o(pe),
            onClickPrevPage: o(be)
          }, Gt({ _: 2 }, [
            d.buttonsPagination ? {
              name: "buttonsPagination",
              fn: bt(() => [
                W(Ea, {
                  "current-pagination-number": o(Z),
                  "max-pagination-number": o(Ie),
                  onUpdatePage: o($e)
                }, null, 8, ["current-pagination-number", "max-pagination-number", "onUpdatePage"])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["is-first-page", "is-last-page", "onClickNextPage", "onClickPrevPage"]))
        ])
      ], 2)),
      Ke(W(Va, { progress: o(Rt) }, null, 8, ["progress"]), [
        [Ve, o(Nt)]
      ])
    ], 2));
  }
}), Ws = (e) => {
  e.component("DataTable", xt);
};
xt.install = Ws;
export {
  Vs as createFilter,
  xt as default,
  Ws as install
};
