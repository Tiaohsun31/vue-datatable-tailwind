var jt = Object.defineProperty;
var Ht = (e, t, a) => t in e ? jt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var He = (e, t, a) => Ht(e, typeof t != "symbol" ? t + "" : t, a);
import { defineComponent as J, computed as x, inject as ke, openBlock as p, createElementBlock as y, normalizeClass as I, withModifiers as vt, createElementVNode as k, normalizeStyle as ue, unref as n, withDirectives as Ke, vShow as Ve, createBlock as ie, ref as G, watch as le, onMounted as pt, onBeforeUnmount as qt, toDisplayString as q, createVNode as U, Transition as zt, withCtx as bt, Fragment as te, renderList as ye, createCommentVNode as H, renderSlot as M, onUnmounted as Wt, toRefs as Ut, provide as nt, useSlots as Kt, mergeProps as W, normalizeProps as Be, guardReactiveProps as ot, createTextVNode as qe, isRef as Vt, createSlots as Gt } from "vue";
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
    return (c, g) => (p(), y("div", {
      class: I(["relative inline-flex items-center justify-center h-5 w-5", [
        !c.disabled && "cursor-pointer group",
        c.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: g[0] || (g[0] = vt((o) => !c.disabled && c.$emit("change"), ["stop", "prevent"]))
    }, [
      k("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: a.value,
        disabled: c.disabled,
        "aria-checked": a.value
      }, null, 8, Jt),
      k("div", {
        class: I(["h-4 w-4 rounded transition-all duration-200 border", [
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
        style: ue(n(l).style)
      }, [
        Ke((p(), y("svg", Yt, g[1] || (g[1] = [
          k("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ve, a.value && !s.value]
        ]),
        Ke((p(), y("svg", Zt, g[2] || (g[2] = [
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
    return (s, l) => (p(), ie(Qt, {
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
    return (g, o) => (p(), ie(ht, {
      checked: s.value,
      partial: l.value,
      disabled: e.disabled,
      onChange: o[0] || (o[0] = (i) => c("change", !s.value))
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
      set: (m) => s("update:modelValue", m)
    }), o = ke("dataTable");
    le(l, (m) => {
      if (m && (o != null && o.value)) {
        const C = window.innerHeight, P = o.value.getBoundingClientRect(), _ = C - (P.height + P.top);
        c.value = _ <= 100;
      }
    });
    const i = (m) => {
      g.value = m, l.value = !1;
    }, u = () => {
      l.value = !l.value;
    }, r = (m) => {
      m.target.closest(".relative") || (l.value = !1);
    }, b = (m) => {
      const C = m.relatedTarget;
      C != null && C.closest(".relative") || (l.value = !1);
    };
    return pt(() => {
      document.addEventListener("click", r);
    }), qt(() => {
      document.removeEventListener("click", r);
    }), (m, C) => (p(), y("div", ea, [
      k("button", {
        type: "button",
        class: I(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-sm border border-gray-300", [
          "focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500",
          l.value ? "ring-1 ring-primary-500 border-primary-500" : "hover:border-gray-400"
        ]]),
        onClick: u,
        "aria-haspopup": "listbox",
        "aria-expanded": l.value
      }, [
        k("span", aa, q(g.value), 1),
        k("span", sa, [
          (p(), y("svg", {
            class: I(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": l.value }]),
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor"
          }, C[0] || (C[0] = [
            k("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "M19 9l-7 7-7-7"
            }, null, -1)
          ]), 2))
        ])
      ], 10, ta),
      U(zt, {
        "enter-active-class": "transition duration-100 ease-out",
        "enter-from-class": "transform scale-95 opacity-0",
        "enter-to-class": "transform scale-100 opacity-100",
        "leave-active-class": "transition duration-75 ease-in",
        "leave-from-class": "transform scale-100 opacity-100",
        "leave-to-class": "transform scale-95 opacity-0"
      }, {
        default: bt(() => [
          l.value ? (p(), y("ul", {
            key: 0,
            class: I(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", { "bottom-full mb-1": c.value }]),
            tabindex: "-1",
            role: "listbox",
            onFocusout: b
          }, [
            (p(!0), y(te, null, ye(e.rowsItems, (P) => (p(), y("li", {
              key: P,
              class: I(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                P === g.value ? "bg-primary-100 text-primary-900" : "text-gray-900 hover:bg-gray-100"
              ]]),
              role: "option",
              "aria-selected": P === g.value,
              onClick: (_) => i(P)
            }, [
              k("span", {
                class: I(["block", { "font-medium": P === g.value }])
              }, q(P), 3),
              P === g.value ? (p(), y("span", na, C[1] || (C[1] = [
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
              ]))) : H("", !0)
            ], 10, ra))), 128))
          ], 34)) : H("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), la = { class: "inline-flex relative w-[60px] h-[60px]" }, ia = /* @__PURE__ */ J({
  __name: "Loading",
  setup(e) {
    const t = ke("themeClasses");
    return (a, s) => (p(), y("div", la, [
      (p(), y(te, null, ye(4, (l) => k("div", {
        key: l,
        class: I(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring", [`animate-delay-${(l - 1) * 150}`]]),
        style: ue({
          borderTopColor: n(t).hex
        })
      }, null, 6)), 64))
    ]));
  }
}), ce = (e, t) => {
  const a = e.__vccOpts || e;
  for (const [s, l] of t)
    a[s] = l;
  return a;
}, ua = /* @__PURE__ */ ce(ia, [["__scopeId", "data-v-e9a27991"]]), ca = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" }, da = /* @__PURE__ */ J({
  __name: "LoadingLine",
  setup(e) {
    const t = ke("themeClasses");
    return (a, s) => (p(), y("div", ca, [
      k("div", {
        class: "absolute h-[3px] w-2/5 animate-loading-line",
        style: ue({ backgroundColor: n(t).hex })
      }, null, 4)
    ]));
  }
}), fa = /* @__PURE__ */ ce(da, [["__scopeId", "data-v-cbdc3562"]]), ga = {}, va = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function pa(e, t) {
  return p(), y("svg", va, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const yt = /* @__PURE__ */ ce(ga, [["render", pa]]), ba = {}, ha = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function ya(e, t) {
  return p(), y("svg", ha, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const mt = /* @__PURE__ */ ce(ba, [["render", ya]]), ma = {}, xa = { class: "px-3 py-1.5" };
function wa(e, t) {
  return p(), y("span", xa, t[0] || (t[0] = [
    k("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      k("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const ka = /* @__PURE__ */ ce(ma, [["render", wa]]), Pa = {}, Ca = {
  class: "w-4 h-4 transition-transform duration-200",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function _a(e, t) {
  return p(), y("svg", Ca, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ia = /* @__PURE__ */ ce(Pa, [["render", _a]]), Sa = {}, $a = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ba(e, t) {
  return p(), y("svg", $a, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Aa = /* @__PURE__ */ ce(Sa, [["render", Ba]]), Na = {}, Ra = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ma(e, t) {
  return p(), y("svg", Ra, t[0] || (t[0] = [
    k("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const La = /* @__PURE__ */ ce(Na, [["render", Ma]]), Ta = {
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
    const a = e, s = t, l = ke("themeClasses"), c = (o) => {
      o.type === "button" && !o.active && s("updatePage", o.page);
    }, g = x(() => {
      const o = [], { maxPaginationNumber: i, currentPaginationNumber: u } = a;
      if (i <= he) {
        for (let r = 1; r <= i; r += 1)
          o.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: r + 1 === u
          });
        return o;
      }
      if ([1, 2, i, i - 1].includes(u))
        for (let r = 1; r <= he; r += 1)
          if (r <= 3)
            o.push({
              type: "button",
              page: r,
              active: r === u,
              activePrev: r + 1 === u
            });
          else if (r === 4)
            o.push({ type: "omission" });
          else {
            const b = i - (he - r);
            o.push({
              type: "button",
              page: b,
              active: b === u,
              activePrev: b + 1 === u
            });
          }
      else if ([3, 4].includes(u))
        for (let r = 1; r <= he; r += 1)
          r <= 5 ? o.push({
            type: "button",
            page: r,
            active: r === u,
            activePrev: r + 1 === u
          }) : r === 6 ? o.push({ type: "omission" }) : o.push({
            type: "button",
            page: i,
            active: i === u,
            activePrev: !1
          });
      else if ([i - 2, i - 3].includes(u))
        for (let r = 1; r <= he; r += 1)
          if (r === 1)
            o.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (r === 2)
            o.push({ type: "omission" });
          else {
            const b = i - (he - r);
            o.push({
              type: "button",
              page: b,
              active: b === u,
              activePrev: b + 1 === u
            });
          }
      else
        for (let r = 1; r <= he; r += 1)
          if (r === 1)
            o.push({
              type: "button",
              page: 1,
              active: u === 1,
              activePrev: !1
            });
          else if (r === 2 || r === 6)
            o.push({ type: "omission" });
          else if (r === 7)
            o.push({
              type: "button",
              page: i,
              active: i === u,
              activePrev: !1
            });
          else {
            const b = 4 - r, m = u - b;
            o.push({
              type: "button",
              page: m,
              active: m === u,
              activePrev: m + 1 === u
            });
          }
      return o;
    });
    return (o, i) => (p(), y("div", Ta, [
      (p(!0), y(te, null, ye(g.value, (u, r) => (p(), y("div", {
        key: r,
        class: I(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          r === 0 && "rounded-l-md",
          // Last item styles
          r === g.value.length - 1 && "rounded-r-md",
          // Button specific styles
          u.type === "button" && [
            "border border-gray-300",
            // Active state
            u.active ? [
              "z-10",
              n(l).base,
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-none focus:ring-1",
              `focus:ring-${n(l).tailwindName}-500`,
              `focus:border-${n(l).tailwindName}-500`
            ],
            // Disable hover effect for active button
            !u.active && "cursor-pointer",
            // Connect borders for middle buttons
            r !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          u.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            r !== 0 && "-ml-px"
          ]
        ]]),
        style: ue(n(l).style),
        onClick: (b) => c(u)
      }, [
        u.type === "button" ? (p(), y("span", {
          key: 0,
          class: I(["px-3 py-1.5", { "font-medium": u.active }])
        }, q(u.page), 3)) : (p(), ie(n(ka), { key: 1 }))
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
    return (s, l) => (p(), y("div", Oa, [
      k("button", {
        type: "button",
        class: I(["relative inline-flex items-center p-1.5 rounded-md border", [
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
        U(n(mt), {
          class: I({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Da),
      M(s.$slots, "buttonsPagination"),
      k("button", {
        type: "button",
        class: I(["relative inline-flex items-center p-1.5 rounded-md border", [
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
        U(n(yt), {
          class: I({ "opacity-50": e.isLastPage })
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
    return (a, s) => (p(), y("div", qa, [
      k("div", za, [
        s[0] || (s[0] = k("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        k("div", Wa, [
          k("div", Ua, [
            k("div", {
              class: "h-2 rounded transition-all duration-300 ease-out",
              style: ue({ width: `${a.progress}%`, backgroundColor: n(t).hex })
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
    clickRow: (c, g, o) => {
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
      s("clickRow", i, o);
    }
  };
}
function Ja(e, t, a) {
  const s = G([]);
  return {
    expandingItemIndexList: s,
    // 展開項的索引列表
    updateExpandingItemIndexList: (g, o, i) => {
      i.stopPropagation();
      const u = s.value.indexOf(g);
      if (u !== -1)
        s.value.splice(u, 1);
      else {
        const r = e.value.findIndex((b) => JSON.stringify(b) === JSON.stringify(o));
        a("expandRow", t.value + r, o), s.value.push(t.value + r);
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
  const a = x(() => e.value.filter((o) => o.fixed)), s = x(() => a.value.length ? a.value[a.value.length - 1].value : ""), l = x(() => {
    if (!a.value.length) return [];
    const o = a.value.map((i) => i.width ?? 100);
    return a.value.map((i, u) => ({
      value: i.value,
      // 列標籤
      fixed: i.fixed ?? !0,
      // 是否固定
      width: i.width ?? 100,
      // 列寬度
      // 計算距離左側的距離
      distance: u === 0 ? 0 : o.reduce((r, b, m) => m < u ? r + b : r, 0)
    }));
  }), c = G(!1);
  let g = null;
  return pt(() => {
    const o = t.value;
    if (o) {
      const i = () => {
        c.value = o.scrollLeft > 0;
      };
      i(), o.addEventListener("scroll", i), g = () => {
        o.removeEventListener("scroll", i);
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
function Za(e, t, a, s, l, c, g, o, i, u, r, b, m, C, P, _, L, S, F) {
  const T = x(() => g.value.length ? {
    hasFixedColumns: g.value.some((B) => B.fixed),
    fixedHeaders: g.value.filter((B) => B.fixed),
    unFixedHeaders: g.value.filter((B) => !B.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), O = G(
    Qa(P.value, _.value, L.value)
  ), { determineHeaderSortState: Y } = ts(r, m, L, O), me = x(() => {
    const { fixedHeaders: B, unFixedHeaders: D } = T.value, E = [...B, ...D].map((j) => ({
      ...j,
      sortType: j.sortable ? Y(j.value) : void 0
    }));
    return [
      ...Object.values(ae.value).filter(Boolean),
      ...E
    ];
  }), ae = x(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: s.value || T.value.hasFixedColumns,
      width: t.value ?? 36
    },
    index: C.value && {
      text: e.value,
      value: "index",
      fixed: c.value || T.value.hasFixedColumns,
      width: i.value
    },
    expand: o.value && {
      text: "",
      value: "expand",
      fixed: l.value || T.value.hasFixedColumns,
      width: a.value
    }
  })), se = x(
    () => me.value.map((B) => B.value)
  ), Pe = (B, D) => {
    const E = D === "none" ? "asc" : D === "asc" ? "desc" : b.value ? "asc" : null;
    if (r.value) {
      S(B, E);
      return;
    }
    const j = L.value ? Xa(B, E, O.value) : es(B, E);
    O.value = j, F("updateSort", { sortType: E, sortBy: B });
  }, Ce = x(() => (B) => {
    var E, j;
    const D = r.value ? (E = m.value) == null ? void 0 : E.sortBy : (j = O.value) == null ? void 0 : j.sortBy;
    return Array.isArray(D) && D.includes(B);
  }), z = x(() => (B) => {
    var E, j;
    const D = r.value ? (E = m.value) == null ? void 0 : E.sortBy : (j = O.value) == null ? void 0 : j.sortBy;
    return Array.isArray(D) ? D.indexOf(B) + 1 : !1;
  });
  return {
    clientSortOptions: O,
    headerColumns: se,
    headersForRender: me,
    updateSortField: Pe,
    isMultiSorting: Ce,
    getMultiSortNumber: z
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
  const l = (o) => !e.value || !t.value ? c(o) : g(o), c = (o) => {
    if (!s.value) return "none";
    const { sortBy: i, sortDesc: u } = s.value;
    if (a.value && Array.isArray(i) && Array.isArray(u)) {
      const r = i.indexOf(o);
      return r !== -1 ? u[r] ? "desc" : "asc" : "none";
    }
    return o === i ? u ? "desc" : "asc" : "none";
  }, g = (o) => {
    const { sortBy: i, sortType: u } = t.value;
    if (a.value && Array.isArray(i) && Array.isArray(u)) {
      const r = i.indexOf(o);
      return r !== -1 ? u[r] : "none";
    }
    return o === i && u ? u : "none";
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
      a = Object.entries(c).sort(([g], [o]) => g.localeCompare(o)).map(([g, o]) => `${g}:${o}`).join("|"), this.itemKeyCache.set(t, a);
    }
    return a;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function ss(e, t, a, s, l, c, g, o, i, u) {
  const r = new as(), b = x(
    () => (e.value - 1) * l.value + 1
  ), m = x(() => a.value ? Math.min(
    i.value,
    e.value * l.value
  ) : Math.min(
    o.value.length,
    e.value * l.value
  )), C = x(() => a.value ? s.value : o.value.slice(
    b.value - 1,
    m.value
  )), P = x(() => g.value ? C.value.map((S, F) => ({
    index: b.value + F,
    ...S
  })) : C.value), _ = x(() => {
    if (c.value.length === 0)
      return "noneSelected";
    const S = u ? o.value.filter((T) => !u(T)) : o.value;
    return c.value.length === S.length && c.value.every(
      (O) => S.some(
        (Y) => r.getItemKey(O) === r.getItemKey(Y)
      )
    ) ? "allSelected" : "partSelected";
  }), L = x(() => {
    if (!t.value)
      return P.value;
    switch (_.value) {
      case "allSelected":
        return P.value.map((S) => ({
          checkbox: !u || !u(S),
          // 考慮禁用狀態
          ...S
        }));
      case "noneSelected":
        return P.value.map((S) => ({
          checkbox: !1,
          ...S
        }));
      default:
        return P.value.map((S) => ({
          checkbox: c.value.some(
            (T) => r.getItemKey(S) === r.getItemKey(T)
          ) && (!u || !u(S)),
          ...S
        }));
    }
  });
  return {
    currentPageFirstIndex: b,
    currentPageLastIndex: m,
    multipleSelectStatus: _,
    pageItems: L
  };
}
function rs(e, t, a, s, l, c, g) {
  const o = G(c.value ? c.value.page : e.value), i = x(() => Math.ceil(s.value / l.value)), u = x(() => i.value === 0 || o.value === i.value), r = x(() => o.value === 1);
  return {
    currentPaginationNumber: o,
    maxPaginationNumber: i,
    isLastPage: u,
    isFirstPage: r,
    nextPage: () => {
      if (s.value !== 0 && !u.value && !a.value)
        if (t.value) {
          const _ = o.value + 1;
          g(_);
        } else
          o.value += 1;
    },
    prevPage: () => {
      if (s.value !== 0 && !r.value && !a.value)
        if (t.value) {
          const _ = o.value - 1;
          g(_);
        } else
          o.value -= 1;
    },
    updatePage: (_) => {
      a.value || (t.value ? g(_) : o.value = _);
    },
    updateCurrentPaginationNumber: (_) => {
      o.value = _;
    }
  };
}
function ns(e, t, a, s) {
  var o;
  const l = x(() => !e.value && t.value.findIndex((i) => i === s.value) === -1 ? [s.value, ...t.value] : t.value), c = G(((o = a.value) == null ? void 0 : o.rowsPerPage) ?? s.value);
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
        const { page: o, rowsPerPage: i, sortBy: u, sortType: r } = e.value;
        return { page: o, rowsPerPage: i, sortBy: u ?? null, sortType: r ?? null };
      }
      return null;
    },
    set: (o) => {
      a("update:serverOptions", o);
    }
  });
  return {
    serverOptionsComputed: s,
    updateServerOptionsPage: (o) => {
      s.value && (s.value = {
        ...s.value,
        page: o
      });
    },
    updateServerOptionsSort: (o, i) => {
      if (s.value)
        if (t.value && Array.isArray(s.value.sortBy) && Array.isArray(s.value.sortType)) {
          const u = s.value.sortBy.findIndex((r) => r === o);
          u === -1 && i !== null && (s.value.sortBy.push(o), s.value.sortType.push(i)), i === null ? (s.value.sortBy.splice(u, 1), s.value.sortType.splice(u, 1)) : s.value.sortType[u] = i;
        } else
          s.value = {
            ...s.value,
            sortBy: i !== null ? o : null,
            sortType: i
          };
    },
    updateServerOptionsRowsPerPage: (o) => {
      s.value && (s.value = {
        ...s.value,
        page: 1,
        rowsPerPage: o
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
  le(t, (r) => {
    if (r === null) {
      l.value.selectedItems.clear(), l.value.itemsMap.clear();
      return;
    }
    const b = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const C of r) {
      const P = Le(C);
      b.add(P), m.set(P, C);
    }
    l.value.selectedItems = b, l.value.itemsMap = m;
  }, { immediate: !0, deep: !0 });
  const c = async (r, b, m) => new Promise((C) => {
    requestAnimationFrame(() => {
      const P = new Set(l.value.selectedItems), _ = new Map(l.value.itemsMap);
      for (let L = 0; L < r.length; L++) {
        const S = r[L], F = Le(S);
        b ? (P.add(F), _.set(F, S)) : P.delete(F), l.value.processedCount = m + L + 1, l.value.visualProgress = l.value.processedCount / l.value.totalCount * 100;
      }
      l.value.selectedItems = P, l.value.itemsMap = _, C();
    });
  }), g = async (r) => {
    if (!l.value.selectionInProgress)
      try {
        if (l.value.selectionInProgress = !0, l.value.processedCount = 0, l.value.totalCount = e.value.length, l.value.visualProgress = 0, !r) {
          l.value.selectedItems.clear(), l.value.itemsMap.clear(), s("update:itemsSelected", []), l.value.visualProgress = 100;
          return;
        }
        const b = e.value;
        for (let m = 0; m < b.length; m += lt) {
          const P = b.slice(m, Math.min(m + lt, b.length)).filter((_) => !a(_));
          await c(P, r, m), await new Promise((_) => setTimeout(_, 0));
        }
        s("update:itemsSelected", i.value), r && s("selectAll");
      } finally {
        l.value.selectionInProgress = !1;
      }
  }, o = (r) => {
    const b = Le(r), m = { ...r };
    delete m.checkbox, delete m.index;
    const C = new Set(l.value.selectedItems), P = new Map(l.value.itemsMap);
    C.has(b) ? (C.delete(b), s("deselectRow", m)) : (C.add(b), P.set(b, m), s("selectRow", m)), l.value.selectedItems = C, l.value.itemsMap = P, s("update:itemsSelected", Array.from(P.values()).filter((L) => C.has(Le(L))));
  }, i = x(() => l.value.selectedItems.size === 0 ? [] : Array.from(l.value.itemsMap.entries()).filter(([r]) => l.value.selectedItems.has(r)).map(([, r]) => r)), u = x(() => l.value.visualProgress);
  return {
    selectedItems: i,
    toggleSelectAll: g,
    toggleSelectItem: o,
    isProcessing: x(() => l.value.selectionInProgress),
    selectionProgress: u
  };
}
function gs(e, t, a, s, l, c, g, o, i, u, r, b) {
  const m = /* @__PURE__ */ new WeakMap(), C = (v) => {
    let h = m.get(v);
    return h || (typeof c.value == "string" && c.value !== "" ? h = String(V(c.value, v)) : Array.isArray(c.value) ? h = c.value.map((w) => String(V(w, v))).join(" ") : h = Object.values(v).map(String).join(" "), m.set(v, h)), h;
  }, P = x(() => {
    if (!a.value && g.value !== "") {
      const v = new RegExp(g.value, "i");
      return s.value.filter((h) => v.test(C(h)));
    }
    return s.value;
  }), _ = (v, h) => {
    const w = cs(v) ? v : parseFloat(String(v));
    if (isNaN(w)) return !1;
    if (h.comparison === "between" && Array.isArray(h.criteria)) {
      const [Z, re] = h.criteria;
      return w >= Z && w <= re;
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
  }, L = x(() => {
    var v;
    return (v = t.value) != null && v.length ? P.value.filter(
      (h) => t.value.every((w) => {
        const N = V(w.field, h);
        return us(w) ? w.comparison(N, w.criteria) : ls(w) ? _(N, w) : is(w) ? w.criteria.includes(N) : w.comparison === "=" ? N === w.criteria : N !== w.criteria;
      })
    ) : P.value;
  }), S = (v, h, w) => v === h ? 0 : v == null ? 1 : h == null ? -1 : v < h ? w ? 1 : -1 : w ? -1 : 1, F = (v, h, w, N) => N < 0 ? v : F(v, h, w, N - 1).sort((Z, re) => {
    if (!h.slice(0, N).every((xe) => V(xe, Z) === V(xe, re))) return 0;
    const _e = h[N], Ne = V(_e, Z), K = V(_e, re);
    return S(Ne, K, w[N]);
  }), T = x(() => {
    if (a.value) return s.value;
    if (!e.value) return L.value;
    const { sortBy: v, sortDesc: h } = e.value, w = [...L.value];
    return i.value && Array.isArray(v) && Array.isArray(h) ? v.length ? F(w, v, h, v.length - 1) : w : w.sort((N, Z) => {
      const re = V(v, N), Ae = V(v, Z);
      return S(re, Ae, h);
    });
  }), O = x(() => a.value ? o.value : T.value.length), Y = x(() => a.value ? !1 : (a.value ? o.value : s.value.length) >= u.value), {
    selectedItems: me,
    toggleSelectAll: ae,
    toggleSelectItem: se,
    isProcessing: Pe,
    selectionProgress: Ce
  } = fs(T, l, r, b), z = x({
    get: () => l.value ?? [],
    set: (v) => {
      b("update:itemsSelected", v);
    }
  }), B = (v) => v.filter((h) => !r(h)), D = (v) => {
    z.value = v ? B(T.value) : z.value = [], v && b("selectAll");
  }, E = (v) => {
    const h = v.checkbox;
    if (delete v.checkbox, delete v.index, h)
      z.value = z.value.filter(
        (w) => JSON.stringify(w) !== JSON.stringify(v)
      ), b("deselectRow", v);
    else {
      const w = z.value;
      w.unshift(v), z.value = w, b("selectRow", v);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: z,
    totalItemsLength: O,
    toggleSelectAll: (v) => {
      if (!T.value.every((w) => r(w)))
        if (Y.value) {
          b("updateSelectionStatus", !0);
          try {
            ae(v), b("update:itemsSelected", v ? Array.from(me.value) : []), v && b("selectAll");
          } finally {
            b("updateSelectionStatus", !1);
          }
        } else
          D(v);
    },
    toggleSelectItem: (v) => {
      r(v) || (Y.value ? se(v) : E(v));
    },
    isProcessing: x(() => Y.value && Pe.value),
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
      for (var r in u) Object.defineProperty(i, r, {
        enumerable: !0,
        get: u[r]
      });
    }
    t(e, {
      dim: function() {
        return g;
      },
      default: function() {
        return o;
      }
    });
    const a = /* @__PURE__ */ s(/* @__PURE__ */ ps());
    function s(i) {
      return i && i.__esModule ? i : {
        default: i
      };
    }
    let l = /* @__PURE__ */ new Set();
    function c(i, u, r) {
      typeof process < "u" && process.env.JEST_WORKER_ID || r && l.has(r) || (r && l.add(r), console.warn(""), u.forEach((b) => console.warn(i, "-", b)));
    }
    function g(i) {
      return a.default.dim(i);
    }
    const o = {
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
    function s({ version: c, from: g, to: o }) {
      t.default.warn(`${g}-color-renamed`, [
        `As of Tailwind CSS ${c}, \`${g}\` has been renamed to \`${o}\`.`,
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
function ys() {
  if (ft) return Ue;
  ft = 1;
  let e = hs();
  return Ue = (e.__esModule ? e : { default: e }).default, Ue;
}
var ms = ys();
const ee = /* @__PURE__ */ vs(ms), Ge = {
  light: "400",
  DEFAULT: "500",
  dark: "600"
}, xs = (e) => {
  const t = gt(e);
  if (!t) return { color: "indigo", variant: "DEFAULT" };
  let a = { color: "indigo", variant: "DEFAULT" }, s = 1 / 0;
  const l = Object.entries(ee).reduce((c, [g, o]) => {
    if (typeof o == "object") {
      const i = g;
      Object.entries(Ge).forEach(([u, r]) => {
        o[r] && (c[o[r]] = { color: i, variant: u });
      });
    }
    return c;
  }, {});
  return Object.entries(l).forEach(([c, g]) => {
    const o = gt(c);
    if (!o) return;
    const i = Ps(t, o);
    i < s && (s = i, a = g);
  }), a;
}, ws = (e, t) => {
  const a = Ge[t], s = t === "dark" ? "700" : t === "DEFAULT" ? "600" : "500";
  return {
    "--theme-color": ee[e][a],
    "--theme-border": ee[e][a],
    "--theme-hover": ee[e][s],
    "--theme-active": ee[e][t === "light" ? "500" : t === "DEFAULT" ? "600" : "700"],
    "--theme-disabled": ee.gray[300],
    "--theme-light": ee[e]["400"],
    "--theme-focus": ee[e][a] + "80"
    // 添加 50% 透明度
  };
}, ks = (e) => {
  const { color: t, variant: a = "DEFAULT" } = typeof e == "string" && e.startsWith("#") ? xs(e) : typeof e == "object" ? e : { color: e, variant: "DEFAULT" };
  return {
    base: "bg-theme border-theme text-white",
    hover: "hover:bg-theme-hover",
    active: "active:bg-theme-active",
    disabled: "bg-gray-300 cursor-not-allowed",
    hex: typeof e == "string" && e.startsWith("#") ? e : ee[t][Ge[a]],
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
const Cs = ["id"], _s = ["onClick"], Is = {
  key: 1,
  class: "items-center gap-2"
}, Ss = {
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
      rowsItems: o,
      preventContextMenuRow: i,
      showIndexSymbol: u,
      currentPage: r,
      filterOptions: b,
      headers: m,
      itemsSelected: C,
      loading: P,
      items: _,
      rowsPerPage: L,
      searchField: S,
      searchValue: F,
      serverItemsLength: T,
      showIndex: O,
      sortBy: Y,
      sortType: me,
      serverOptions: ae,
      multiSort: se,
      mustSort: Pe,
      clickEventType: Ce,
      clickRowToSelect: z,
      fixedExpand: B,
      fixedCheckbox: D,
      fixedIndex: E,
      batchSelectionThreshold: j,
      disabledRows: wt
    } = Ut(s), v = x(() => ks(s.theme));
    nt("themeClasses", v);
    const h = Kt(), w = x(() => !!h.pagination), N = x(() => !!h.loading), Z = x(() => !!h.expand), re = x(() => !!h.body), Ae = x(() => !!(h.paginationInfo || h["pagination-info"])), _e = G(null), Ne = G(null);
    nt("dataTable", _e);
    const K = a, xe = x(() => C.value !== null), de = x(() => ae.value !== null), {
      serverOptionsComputed: Fe,
      updateServerOptionsPage: kt,
      updateServerOptionsSort: Pt,
      updateServerOptionsRowsPerPage: Ct
    } = os(
      ae,
      se,
      K
    ), {
      clientSortOptions: Je,
      headerColumns: Ye,
      headersForRender: fe,
      updateSortField: _t,
      isMultiSorting: It,
      getMultiSortNumber: St
    } = Za(
      u,
      l,
      c,
      D,
      B,
      E,
      m,
      Z,
      g,
      xe,
      de,
      Pe,
      Fe,
      O,
      Y,
      me,
      se,
      Pt,
      K
    ), {
      rowsItemsComputed: Ze,
      rowsPerPageRef: ne,
      updateRowsPerPage: $t
    } = ns(
      de,
      o,
      ae,
      L
    ), {
      totalItems: Qe,
      selectItemsComputed: Bt,
      totalItemsLength: Ie,
      toggleSelectAll: At,
      toggleSelectItem: Ee,
      isProcessing: Nt,
      processProgress: Rt
    } = gs(
      Je,
      b,
      de,
      _,
      C,
      S,
      F,
      T,
      se,
      j,
      s.disabledRows,
      K
    ), {
      currentPaginationNumber: Q,
      maxPaginationNumber: Se,
      isLastPage: ge,
      isFirstPage: ve,
      nextPage: pe,
      prevPage: be,
      updatePage: $e,
      updateCurrentPaginationNumber: Mt
    } = rs(
      r,
      de,
      P,
      Ie,
      ne,
      ae,
      kt
    ), {
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      multipleSelectStatus: Xe,
      pageItems: oe
    } = ss(
      Q,
      xe,
      de,
      _,
      ne,
      Bt,
      O,
      Qe,
      Ie,
      s.disabledRows
    ), X = x(() => Q.value === 0 ? 0 : (Q.value - 1) * ne.value), {
      expandingItemIndexList: Re,
      updateExpandingItemIndexList: Me,
      clearExpandingItemIndexList: et
    } = Ja(
      oe,
      X,
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
      O,
      K
    ), Ft = (d, R) => {
      i.value && R.preventDefault(), K("contextmenuRow", d, R);
    }, Et = (d) => {
      const R = d.width ?? (tt.value.length ? 100 : null);
      if (R) return `width: ${R}px; min-width: ${R}px;`;
    }, rt = (d, R = "th") => {
      if (!tt.value.length) return;
      const f = Tt.value.find((A) => A.value === d);
      if (f)
        return `
            left: ${f.distance}px;
            z-index: ${R === "th" ? 3 : 1};
            position: sticky;
            background-color: ${R === "th" ? "none" : "inherit"};
        `;
    }, je = (d) => typeof s.disabledRows == "function" ? s.disabledRows(d) : !1, Ot = x(() => oe.value.every((d) => s.disabledRows(d)));
    return le(P, (d, R) => {
      Fe.value && d === !1 && R === !0 && (Mt(Fe.value.page), et());
    }), le(ne, (d) => {
      de.value ? Ct(d) : $e(1);
    }), le([F, b], () => {
      de.value || $e(1);
    }), le([Q, Je, S, F, b], () => {
      et();
    }, { deep: !0 }), le(oe, (d) => {
      K("updatePageItems", d);
    }, { deep: !0 }), le(Qe, (d) => {
      K("updateTotalItems", d);
    }, { deep: !0 }), t({
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      clientItemsLength: Ie,
      maxPaginationNumber: Se,
      currentPaginationNumber: Q,
      isLastPage: ge,
      isFirstPage: ve,
      nextPage: pe,
      prevPage: be,
      updatePage: $e,
      rowsPerPageOptions: Ze,
      rowsPerPageActiveOption: ne,
      updateRowsPerPageActiveOption: $t
    }), (d, R) => (p(), y("div", {
      ref_key: "dataTable",
      ref: _e,
      class: I(["relative w-full", [d.tableClassName]])
    }, [
      k("div", {
        ref_key: "tableBody",
        ref: Ne,
        class: I(["relative overflow-auto border border-gray-200 min-h-[180px]", [{ "shadow-sm": n(at) }, d.tableBodyClass]])
      }, [
        k("table", {
          id: d.tableNodeId,
          class: "w-full border-collapse bg-white"
        }, [
          k("colgroup", null, [
            (p(!0), y(te, null, ye(n(fe), (f, A) => (p(), y("col", {
              key: A,
              style: ue(Et(f))
            }, null, 4))), 128))
          ]),
          n(h)["customize-headers"] ? M(d.$slots, "customize-headers", { key: 0 }) : n(fe).length && !d.hideHeader ? (p(), y("thead", {
            key: 1,
            class: I([
              "text-sm text-slate-700 uppercase bg-gray-100 text-nowrap",
              d.headerClassName,
              { "sticky top-0 z-10": d.fixedHeader }
            ])
          }, [
            k("tr", {
              class: I([{ "divide-x divide-gray-200": d.borderCell }])
            }, [
              (p(!0), y(te, null, ye(n(fe), (f, A) => (p(), y("th", {
                key: A,
                style: ue(rt(f.value)),
                class: I(["px-4 py-3 font-semibold tracking-wider group", [
                  {
                    "cursor-pointer hover:bg-gray-200": f.sortable,
                    "bg-gray-100": f.sortable && f.sortType === "none" && d.headerClassName === "" && d.headerClassName === "",
                    "bg-gray-200": (f.sortable && f.sortType === "desc" || f.sortType === "asc") && d.headerClassName === "",
                    "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": f.value === n(Lt)
                  },
                  typeof d.headerItemClassName == "string" ? d.headerItemClassName : d.headerItemClassName(f, A + 1),
                  `text-${d.headerTextDirection}`
                ]]),
                onClick: ($) => f.sortable && f.sortType ? n(_t)(f.value, f.sortType) : null
              }, [
                f.text === "checkbox" && n(C) !== null ? (p(), ie(Xt, {
                  disabled: Ot.value,
                  key: n(Xe),
                  status: n(Xe),
                  onChange: n(At)
                }, null, 8, ["disabled", "status", "onChange"])) : (p(), y("div", Is, [
                  n(h)[`header-${f.value}`] ? M(d.$slots, `header-${f.value}`, W({
                    key: 0,
                    ref_for: !0
                  }, f)) : n(h)[`header-${f.value.toLowerCase()}`] ? M(d.$slots, `header-${f.value.toLowerCase()}`, W({
                    key: 1,
                    ref_for: !0
                  }, f)) : n(h).header ? M(d.$slots, "header", W({
                    key: 2,
                    ref_for: !0
                  }, f)) : (p(), y("span", Ss, q(f.text), 1)),
                  f.sortable ? (p(), y("span", {
                    key: f.sortType ? f.sortType : "none",
                    class: I(["inline-flex transition-opacity duration-200", [f.sortType === "none" ? "opacity-0" : "opacity-100", "group-hover:opacity-100"]])
                  }, [
                    U(n(La), {
                      class: I({ "transform rotate-180": f.sortType === "desc" })
                    }, null, 8, ["class"])
                  ], 2)) : H("", !0),
                  n(se) && n(It)(f.value) ? (p(), y("span", $s, q(n(St)(f.value)), 1)) : H("", !0)
                ]))
              ], 14, _s))), 128))
            ], 2)
          ], 2)) : H("", !0),
          re.value ? M(d.$slots, "body", Be(W({ key: 2 }, n(oe)))) : n(Ye).length ? (p(), y("tbody", Bs, [
            M(d.$slots, "body-prepend", Be(ot({
              items: n(oe),
              pagination: {
                isFirstPage: n(ve),
                isLastPage: n(ge),
                currentPaginationNumber: n(Q),
                maxPaginationNumber: n(Se),
                nextPage: n(pe),
                prevPage: n(be)
              },
              headers: n(fe)
            }))),
            (p(!0), y(te, null, ye(n(oe), (f, A) => (p(), y(te, {
              key: f.key || A
            }, [
              k("tr", {
                class: I(["transition-colors bg-white", [
                  { "even:bg-gray-50 odd:bg-white": d.alternating },
                  !d.noHover && "hover:bg-gray-100",
                  typeof d.bodyRowClassName == "string" ? d.bodyRowClassName : d.bodyRowClassName(f, A + 1),
                  { "divide-x divide-gray-200": d.borderCell }
                ]]),
                onClick: ($) => {
                  d.clickRowToExpand && n(Me)(A + X.value, f, $), n(z) && !je(f) && n(Ee)(f), n(st)(f, "single", $);
                },
                onDblclick: ($) => n(st)(f, "double", $),
                onContextmenu: ($) => Ft(f, $)
              }, [
                (p(!0), y(te, null, ye(n(Ye), ($, Dt) => (p(), y("td", {
                  key: Dt,
                  style: ue(rt($, "td")),
                  class: I(["px-4 py-2", [
                    {
                      "cursor-pointer": $ === "expand" && d.expandColumn === ""
                    },
                    typeof d.bodyItemClassName == "string" ? d.bodyItemClassName : d.bodyItemClassName($, A + 1),
                    `text-${d.bodyTextDirection}`
                  ]]),
                  onClick: (we) => $ === "expand" && d.expandColumn === "" ? n(Me)(A + X.value, f, we) : null
                }, [
                  n(h)[`item-${$}`] ? M(d.$slots, `item-${$}`, W({
                    key: 0,
                    ref_for: !0
                  }, f)) : n(h)[`item-${$.toLowerCase()}`] ? M(d.$slots, `item-${$.toLowerCase()}`, W({
                    key: 1,
                    ref_for: !0
                  }, f)) : $ === d.expandColumn ? M(d.$slots, "expand-button", {
                    key: 2,
                    item: f,
                    expanded: n(Re).includes(X.value + A),
                    toggle: (we) => n(Me)(A + X.value, f, we)
                  }, () => [
                    k("button", {
                      onClick: vt((we) => n(Me)(A + X.value, f, we), ["stop"]),
                      class: "inline-flex items-center"
                    }, [
                      U(n(Ia), {
                        class: I({ "transform -rotate-90": n(Re).includes(X.value + A) })
                      }, null, 8, ["class"])
                    ], 8, Rs)
                  ]) : $ === "expand" && d.expandColumn === "" ? (p(), ie(n(Aa), {
                    key: 3,
                    class: I({ "transform rotate-90": n(Re).includes(X.value + A) })
                  }, null, 8, ["class"])) : $ === "checkbox" ? M(d.$slots, "selection-checkbox", W({
                    key: 4,
                    ref_for: !0
                  }, { item: f, index: A, toggleSelectItem: n(Ee), isItemSelected: f[$], isItemDisabled: je(f) }), () => [
                    U(ht, {
                      checked: f[$],
                      onChange: (we) => n(Ee)(f),
                      disabled: je(f)
                    }, null, 8, ["checked", "onChange", "disabled"])
                  ]) : n(h).item ? M(d.$slots, "item", W({
                    key: 5,
                    ref_for: !0
                  }, { column: $, item: f })) : (p(), y(te, { key: 6 }, [
                    qe(q(n(ds)($, f)), 1)
                  ], 64))
                ], 14, Ns))), 128))
              ], 42, As),
              Z.value && n(Re).includes(A + X.value) ? (p(), y("tr", {
                key: 0,
                class: I([
                  { "bg-gray-50": (A + 1) % 2 === 0 },
                  typeof d.bodyExpandRowClassName == "string" ? d.bodyExpandRowClassName : d.bodyExpandRowClassName(f, A + 1)
                ])
              }, [
                k("td", {
                  colspan: n(fe).length,
                  class: "px-4 py-2"
                }, [
                  f.expandLoading ? (p(), ie(fa, {
                    key: 0,
                    class: "mb-4"
                  })) : H("", !0),
                  M(d.$slots, "expand", W({ ref_for: !0 }, f))
                ], 8, Ms)
              ], 2)) : H("", !0)
            ], 64))), 128)),
            M(d.$slots, "body-append", Be(ot({
              items: n(oe),
              pagination: {
                isFirstPage: n(ve),
                isLastPage: n(ge),
                currentPaginationNumber: n(Q),
                maxPaginationNumber: n(Se),
                nextPage: n(pe),
                prevPage: n(be),
                updatePage: n($e)
              },
              headers: n(fe)
            })))
          ])) : H("", !0)
        ], 8, Cs),
        n(P) ? (p(), y("div", Ls, [
          k("div", Ts, [
            N.value ? M(d.$slots, "loading", { key: 0 }) : (p(), ie(ua, { key: 1 }))
          ])
        ])) : H("", !0),
        !n(oe).length && !n(P) ? (p(), y("div", Fs, [
          M(d.$slots, "empty-message", {}, () => [
            qe(q(d.emptyMessage), 1)
          ])
        ])) : H("", !0)
      ], 2),
      d.hideFooter ? H("", !0) : (p(), y("div", {
        key: 0,
        class: I(["flex items-center justify-between px-4 py-3 bg-white", {
          "border border-gray-200 border-t-0": !0,
          "shadow-sm": n(at)
        }])
      }, [
        k("div", Es, [
          k("button", {
            class: "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: R[0] || (R[0] = //@ts-ignore
            (...f) => n(be) && n(be)(...f)),
            disabled: n(ve)
          }, [
            U(n(mt), {
              class: I({ "opacity-50": n(ve) })
            }, null, 8, ["class"])
          ], 8, Os),
          k("button", {
            class: "relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-gray-100",
            onClick: R[1] || (R[1] = //@ts-ignore
            (...f) => n(pe) && n(pe)(...f)),
            disabled: n(ge)
          }, [
            U(n(yt), {
              class: I({ "opacity-50": n(ge) })
            }, null, 8, ["class"])
          ], 8, Ds)
        ]),
        k("div", js, [
          d.hideRowsPerPage ? H("", !0) : (p(), y("div", Hs, [
            qe(q(d.rowsPerPageMessage) + " ", 1),
            U(oa, {
              modelValue: n(ne),
              "onUpdate:modelValue": R[2] || (R[2] = (f) => Vt(ne) ? ne.value = f : null),
              "rows-items": n(Ze)
            }, null, 8, ["modelValue", "rows-items"])
          ])),
          d.hidePaginationInfo ? H("", !0) : (p(), y("div", qs, [
            Ae.value ? M(d.$slots, "pagination-info", Be(W({ key: 0 }, {
              currentPageFirstIndex: n(Oe),
              currentPageLastIndex: n(De),
              totalItemsLength: n(Ie),
              rowsOfPageSeparatorMessage: d.rowsOfPageSeparatorMessage
            }))) : (p(), y("span", zs, q(`${n(Oe)}–${n(De)}`) + " " + q(d.rowsOfPageSeparatorMessage) + " " + q(n(Ie)), 1))
          ])),
          w.value ? M(d.$slots, "pagination", Be(W({ key: 2 }, {
            isFirstPage: n(ve),
            isLastPage: n(ge),
            currentPaginationNumber: n(Q),
            maxPaginationNumber: n(Se),
            nextPage: n(pe),
            prevPage: n(be)
          }))) : (p(), ie(Ha, {
            key: 3,
            "is-first-page": n(ve),
            "is-last-page": n(ge),
            onClickNextPage: n(pe),
            onClickPrevPage: n(be)
          }, Gt({ _: 2 }, [
            d.buttonsPagination ? {
              name: "buttonsPagination",
              fn: bt(() => [
                U(Ea, {
                  "current-pagination-number": n(Q),
                  "max-pagination-number": n(Se),
                  onUpdatePage: n($e)
                }, null, 8, ["current-pagination-number", "max-pagination-number", "onUpdatePage"])
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["is-first-page", "is-last-page", "onClickNextPage", "onClickPrevPage"]))
        ])
      ], 2)),
      Ke(U(Va, { progress: n(Rt) }, null, 8, ["progress"]), [
        [Ve, n(Nt)]
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
