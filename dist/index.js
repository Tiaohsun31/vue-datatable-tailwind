var Wt = Object.defineProperty;
var qt = (e, o, t) => o in e ? Wt(e, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[o] = t;
var qe = (e, o, t) => qt(e, typeof o != "symbol" ? o + "" : o, t);
import { createElementBlock as x, openBlock as k, Fragment as ie, renderList as J, createElementVNode as w, normalizeClass as S, defineComponent as E, normalizeStyle as Me, toDisplayString as V, ref as Z, computed as f, onMounted as Ge, onUnmounted as mt, watch as de, createVNode as H, withModifiers as Ze, withDirectives as Ve, vShow as Ke, createBlock as _, useSlots as vt, renderSlot as N, createCommentVNode as D, normalizeProps as W, guardReactiveProps as ne, unref as y, createSlots as ve, withCtx as re, mergeProps as q, createTextVNode as Le, inject as Vt, onBeforeUnmount as Kt, Transition as Ut, toRefs as Jt, provide as Gt, watchEffect as Zt } from "vue";
const pe = (e, o) => {
  const t = e.__vccOpts || e;
  for (const [a, s] of o)
    t[a] = s;
  return t;
}, Qt = {}, Xt = { class: "inline-flex relative w-[60px] h-[60px]" };
function Yt(e, o) {
  return k(), x("div", Xt, [
    (k(), x(ie, null, J(4, (t) => w("div", {
      key: t,
      class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring border-t-vdt-primary-500", [`animate-delay-${(t - 1) * 150}`]])
    }, null, 2)), 64))
  ]);
}
const _t = /* @__PURE__ */ pe(Qt, [["render", Yt], ["__scopeId", "data-v-c23c712b"]]), ea = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, ta = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, aa = { class: "w-64" }, oa = { class: "h-2 bg-gray-200 rounded-sm" }, sa = { class: "text-center text-sm text-gray-600" }, la = /* @__PURE__ */ E({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(e) {
    return (o, t) => (k(), x("div", ea, [
      w("div", ta, [
        t[0] || (t[0] = w("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        w("div", aa, [
          w("div", oa, [
            w("div", {
              class: "h-2 rounded-sm transition-all duration-300 ease-out bg-vdt-primary-500",
              style: Me({ width: `${o.progress}%` })
            }, null, 4)
          ])
        ]),
        w("div", sa, V(Math.round(o.progress)) + "% ", 1)
      ])
    ]));
  }
});
function na(e, o, t, a, s, n, u, r, l) {
  const i = (d, m) => {
    const P = { ...d };
    return o.value && (delete P.checkbox, P.isSelected = d.checkbox), t.value && (delete P.index, P.indexInCurrentPage = m + 1), P;
  };
  return {
    handleRowClick: (d, m, P) => {
      if (!d.target.closest(".checkbox, .expand-button") && (s.value && u(P, m, d), n.value && !a(m) && r(m), e.value === "single")) {
        const $ = i(m, P);
        l("clickRow", $, d);
      }
    },
    handleRowDoubleClick: (d, m, P) => {
      if (e.value === "double") {
        const $ = i(m, P);
        l("clickRow", $, d);
      }
    },
    handleRowContextMenu: (d, m) => {
      const P = i(m, -1);
      l("contextmenuRow", P, d);
    }
  };
}
function ra(e, o, t) {
  const a = Z([]);
  return {
    expandingItemIndexList: a,
    // 展開項的索引列表
    updateExpandingItemIndexList: (u, r, l) => {
      l.stopPropagation();
      const i = a.value.indexOf(u);
      if (i !== -1)
        a.value.splice(i, 1);
      else {
        const c = e.value.findIndex((v) => JSON.stringify(v) === JSON.stringify(r));
        t("expandRow", o.value + c, r), a.value.push(o.value + c);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      a.value = [];
    }
    // 清空展開列表的方法
  };
}
function ia(e, o) {
  const t = f(() => e.value.filter((c) => c.fixed)), a = f(() => t.value.filter((c) => !c.fixedPosition || c.fixedPosition === "left")), s = f(() => t.value.filter((c) => c.fixedPosition === "right")), n = f(() => a.value.length ? a.value[a.value.length - 1].value : ""), u = f(() => s.value.length ? s.value[0].value : ""), r = f(() => {
    if (!t.value.length) return [];
    const c = [];
    if (a.value.length) {
      const v = a.value.map((p) => p.width ?? 100);
      a.value.forEach((p, d) => {
        c.push({
          value: p.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: p.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: d === 0 ? 0 : v.reduce((m, P, $) => $ < d ? m + P : m, 0)
        });
      });
    }
    if (s.value.length) {
      const v = s.value.map((p) => p.width ?? 100);
      s.value.forEach((p, d) => {
        c.push({
          value: p.value,
          fixed: !0,
          position: "right",
          width: p.width ?? 100,
          distance: d === s.value.length - 1 ? 0 : v.reduce((m, P, $) => $ > d ? m + P : m, 0)
        });
      });
    }
    return c;
  }), l = Z(!1);
  let i = null;
  return Ge(() => {
    const c = o.value;
    if (c) {
      const v = () => {
        l.value = c.scrollLeft > 0;
      };
      v(), c.addEventListener("scroll", v), i = () => {
        c.removeEventListener("scroll", v);
      };
    }
  }), mt(() => {
    i && (i(), i = null);
  }), {
    fixedHeaders: t,
    leftFixedHeaders: a,
    rightFixedHeaders: s,
    lastLeftFixedColumn: n,
    firstRightFixedColumn: u,
    fixedColumnsInfos: r,
    showShadow: l
  };
}
function ua(e, o, t, a, s, n, u, r, l, i, c, v, p, d, m, P, $, F, A, T) {
  const ee = f(() => u.value.length ? {
    hasFixedColumns: u.value.some((B) => B.fixed),
    fixedHeaders: u.value.filter((B) => B.fixed),
    unFixedHeaders: u.value.filter((B) => !B.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), j = Z(
    ca(m.value, P.value, $.value)
  ), { determineHeaderSortState: ue } = ha(c, p, $, j), te = f(() => {
    const B = u.value.map((b) => ({
      ...b,
      sortType: b.sortable ? ue(b.value) : void 0
    })), z = B.filter(
      (b) => b.fixed && (!b.fixedPosition || b.fixedPosition === "left")
    ), O = B.filter((b) => !b.fixed), K = B.filter(
      (b) => b.fixed && b.fixedPosition === "right"
    );
    return [
      ...Object.values(ke.value).filter(Boolean),
      ...z,
      ...O,
      ...K
    ];
  }), ke = f(() => ({
    checkbox: i.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: a.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: o.value ?? 36
    },
    index: d.value && {
      text: e.value,
      value: "index",
      fixed: n.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: l.value
    },
    expand: r.value && !F.value && {
      text: "",
      value: "expand",
      fixed: s.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: t.value
    }
  })), ye = f(
    () => te.value.map((B) => B.value)
  ), be = (B, z) => {
    const O = z === "none" ? "asc" : z === "asc" ? "desc" : v.value ? "asc" : null;
    if (c.value) {
      A(B, O);
      return;
    }
    const K = $.value ? da(B, O, j.value) : ga(B, O);
    j.value = K, T("updateSort", { sortType: O, sortBy: B });
  }, G = f(() => (B) => {
    var O, K;
    const z = c.value ? (O = p.value) == null ? void 0 : O.sortBy : (K = j.value) == null ? void 0 : K.sortBy;
    return Array.isArray(z) && z.includes(B);
  }), Pe = f(() => (B) => {
    var O, K;
    const z = c.value ? (O = p.value) == null ? void 0 : O.sortBy : (K = j.value) == null ? void 0 : K.sortBy;
    return Array.isArray(z) ? z.indexOf(B) + 1 : !1;
  });
  return {
    clientSortOptions: j,
    headerColumns: ye,
    headersForRender: te,
    updateSortField: be,
    isMultiSorting: G,
    getMultiSortNumber: Pe
  };
}
function ca(e, o, t) {
  return t && Array.isArray(e) && Array.isArray(o) ? {
    sortBy: e,
    sortDesc: o.map((a) => a === "desc")
  } : typeof e == "string" && e !== "" ? {
    sortBy: e,
    sortDesc: o === "desc"
  } : null;
}
const da = (e, o, t) => {
  if (!(t != null && t.sortBy) || !Array.isArray(t.sortBy) || !Array.isArray(t.sortDesc))
    return o === null ? null : {
      sortBy: [e],
      sortDesc: [o === "desc"]
    };
  const a = t.sortBy.indexOf(e), s = [...t.sortBy], n = [...t.sortDesc];
  return a === -1 && o !== null ? (s.push(e), n.push(o === "desc")) : o === null ? (s.splice(a, 1), n.splice(a, 1)) : n[a] = o === "desc", { sortBy: s, sortDesc: n };
}, ga = (e, o) => o === null ? null : {
  sortBy: e,
  sortDesc: o === "desc"
};
function ha(e, o, t, a) {
  const s = (r) => !e.value || !o.value ? n(r) : u(r), n = (r) => {
    if (!a.value) return "none";
    const { sortBy: l, sortDesc: i } = a.value;
    if (t.value && Array.isArray(l) && Array.isArray(i)) {
      const c = l.indexOf(r);
      return c !== -1 ? i[c] ? "desc" : "asc" : "none";
    }
    return r === l ? i ? "desc" : "asc" : "none";
  }, u = (r) => {
    const { sortBy: l, sortType: i } = o.value;
    if (t.value && Array.isArray(l) && Array.isArray(i)) {
      const c = l.indexOf(r);
      return c !== -1 ? i[c] : "none";
    }
    return r === l && i ? i : "none";
  };
  return {
    determineHeaderSortState: s
  };
}
class fa {
  constructor() {
    qe(this, "itemKeyCache", /* @__PURE__ */ new WeakMap());
    qe(this, "pageCache", /* @__PURE__ */ new Map());
  }
  getItemKey(o) {
    let t = this.itemKeyCache.get(o);
    if (!t) {
      const { checkbox: a, index: s, ...n } = o;
      t = Object.entries(n).sort(([u], [r]) => u.localeCompare(r)).map(([u, r]) => `${u}:${r}`).join("|"), this.itemKeyCache.set(o, t);
    }
    return t;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function pa(e, o, t, a, s, n, u, r, l, i) {
  const c = new fa(), v = f(
    () => (e.value - 1) * s.value + 1
  ), p = f(() => t.value ? Math.min(
    l.value,
    e.value * s.value
  ) : Math.min(
    r.value.length,
    e.value * s.value
  )), d = f(() => t.value ? a.value : r.value.slice(
    v.value - 1,
    p.value
  )), m = f(() => u.value ? d.value.map((F, A) => ({
    index: v.value + A,
    ...F
  })) : d.value), P = f(() => {
    if (n.value.length === 0)
      return "noneSelected";
    const F = i ? r.value.filter((T) => !i(T)) : r.value;
    return n.value.length === F.length && n.value.every(
      (ee) => F.some(
        (j) => c.getItemKey(ee) === c.getItemKey(j)
      )
    ) ? "allSelected" : "partSelected";
  }), $ = f(() => {
    if (!o.value)
      return m.value;
    switch (P.value) {
      case "allSelected":
        return m.value.map((F) => ({
          checkbox: !i || !i(F),
          // 考慮禁用狀態
          ...F
        }));
      case "noneSelected":
        return m.value.map((F) => ({
          checkbox: !1,
          ...F
        }));
      default:
        return m.value.map((F) => ({
          checkbox: n.value.some(
            (T) => c.getItemKey(F) === c.getItemKey(T)
          ) && (!i || !i(F)),
          ...F
        }));
    }
  });
  return {
    currentPageFirstIndex: v,
    currentPageLastIndex: p,
    multipleSelectStatus: P,
    pageItems: $
  };
}
function ma(e, o, t, a, s, n, u) {
  const r = Z(n.value ? n.value.page : e.value), l = f(() => Math.ceil(a.value / s.value)), i = f(() => l.value === 0 || r.value === l.value), c = f(() => r.value === 1);
  return {
    currentPaginationNumber: r,
    maxPaginationNumber: l,
    isLastPage: i,
    isFirstPage: c,
    nextPage: () => {
      if (a.value !== 0 && !i.value && !t.value)
        if (o.value) {
          const P = r.value + 1;
          u(P);
        } else
          r.value += 1;
    },
    prevPage: () => {
      if (a.value !== 0 && !c.value && !t.value)
        if (o.value) {
          const P = r.value - 1;
          u(P);
        } else
          r.value -= 1;
    },
    updatePage: (P) => {
      t.value || (o.value ? u(P) : r.value = P);
    },
    updateCurrentPaginationNumber: (P) => {
      r.value = P;
    }
  };
}
function va(e, o, t, a) {
  var r;
  const s = f(() => !e.value && o.value.findIndex((l) => l === a.value) === -1 ? [a.value, ...o.value] : o.value), n = Z(((r = t.value) == null ? void 0 : r.rowsPerPage) ?? a.value);
  return {
    rowsItemsComputed: s,
    // 計算後的每頁行數選項
    rowsPerPageRef: n,
    // 每頁行數
    updateRowsPerPage: (l) => {
      n.value = l;
    }
    // 更新每頁行數
  };
}
function ka(e, o, t) {
  const a = f({
    get: () => {
      if (e.value) {
        const { page: r, rowsPerPage: l, sortBy: i, sortType: c } = e.value;
        return { page: r, rowsPerPage: l, sortBy: i ?? null, sortType: c ?? null };
      }
      return null;
    },
    set: (r) => {
      t("update:serverOptions", r);
    }
  });
  return {
    serverOptionsComputed: a,
    updateServerOptionsPage: (r) => {
      a.value && (a.value = {
        ...a.value,
        page: r
      });
    },
    updateServerOptionsSort: (r, l) => {
      if (a.value)
        if (o.value && Array.isArray(a.value.sortBy) && Array.isArray(a.value.sortType)) {
          const i = a.value.sortBy.findIndex((c) => c === r);
          i === -1 && l !== null && (a.value.sortBy.push(r), a.value.sortType.push(l)), l === null ? (a.value.sortBy.splice(i, 1), a.value.sortType.splice(i, 1)) : a.value.sortType[i] = l;
        } else
          a.value = {
            ...a.value,
            sortBy: l !== null ? r : null,
            sortType: l
          };
    },
    updateServerOptionsRowsPerPage: (r) => {
      a.value && (a.value = {
        ...a.value,
        page: 1,
        rowsPerPage: r
      });
    }
  };
}
function ya(e) {
  return [">", ">=", "<", "<=", "between"].includes(e.comparison);
}
function ba(e) {
  return e.comparison === "in";
}
function Pa(e) {
  return typeof e.comparison == "function";
}
function xa(e) {
  return typeof e == "number" && !isNaN(e);
}
const Yo = {
  number(e, o, t) {
    return { field: e, comparison: o, criteria: t };
  },
  string(e, o, t) {
    return { field: e, comparison: o, criteria: t };
  },
  array(e, o) {
    return { field: e, comparison: "in", criteria: o };
  },
  custom(e, o, t) {
    return { field: e, comparison: o, criteria: t };
  }
};
function Y(e, o) {
  if (e.includes(".")) {
    const t = e.split(".");
    let a = o;
    for (const s of t)
      if (a && typeof a == "object")
        a = a[s];
      else
        return "";
    return a ?? "";
  }
  return o[e] ?? "";
}
function wa(e, o) {
  const t = Y(e, o);
  return Array.isArray(t) ? t.join(",") : t;
}
const gt = 1e3, ht = /* @__PURE__ */ new WeakMap(), Re = (e) => {
  let o = ht.get(e);
  if (!o) {
    const { checkbox: t, index: a, ...s } = e;
    o = JSON.stringify(s), ht.set(e, o);
  }
  return o;
};
function Ca(e, o, t, a) {
  const s = Z({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  de(o, (c) => {
    if (c === null) {
      s.value.selectedItems.clear(), s.value.itemsMap.clear();
      return;
    }
    const v = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Map();
    for (const d of c) {
      const m = Re(d);
      v.add(m), p.set(m, d);
    }
    s.value.selectedItems = v, s.value.itemsMap = p;
  }, { immediate: !0, deep: !0 });
  const n = async (c, v, p) => new Promise((d) => {
    requestAnimationFrame(() => {
      const m = new Set(s.value.selectedItems), P = new Map(s.value.itemsMap);
      for (let $ = 0; $ < c.length; $++) {
        const F = c[$], A = Re(F);
        v ? (m.add(A), P.set(A, F)) : m.delete(A), s.value.processedCount = p + $ + 1, s.value.visualProgress = s.value.processedCount / s.value.totalCount * 100;
      }
      s.value.selectedItems = m, s.value.itemsMap = P, d();
    });
  }), u = async (c) => {
    if (!s.value.selectionInProgress)
      try {
        if (s.value.selectionInProgress = !0, s.value.processedCount = 0, s.value.totalCount = e.value.length, s.value.visualProgress = 0, !c) {
          s.value.selectedItems.clear(), s.value.itemsMap.clear(), a("update:itemsSelected", []), s.value.visualProgress = 100;
          return;
        }
        const v = e.value;
        for (let p = 0; p < v.length; p += gt) {
          const m = v.slice(p, Math.min(p + gt, v.length)).filter((P) => !t(P));
          await n(m, c, p), await new Promise((P) => setTimeout(P, 0));
        }
        a("update:itemsSelected", l.value), c && a("selectAll");
      } finally {
        s.value.selectionInProgress = !1;
      }
  }, r = (c) => {
    const v = Re(c), p = { ...c };
    delete p.checkbox, delete p.index;
    const d = new Set(s.value.selectedItems), m = new Map(s.value.itemsMap);
    d.has(v) ? (d.delete(v), a("deselectRow", p)) : (d.add(v), m.set(v, p), a("selectRow", p)), s.value.selectedItems = d, s.value.itemsMap = m, a("update:itemsSelected", Array.from(m.values()).filter(($) => d.has(Re($))));
  }, l = f(() => s.value.selectedItems.size === 0 ? [] : Array.from(s.value.itemsMap.entries()).filter(([c]) => s.value.selectedItems.has(c)).map(([, c]) => c)), i = f(() => s.value.visualProgress);
  return {
    selectedItems: l,
    toggleSelectAll: u,
    toggleSelectItem: r,
    isProcessing: f(() => s.value.selectionInProgress),
    selectionProgress: i
  };
}
function Sa(e, o, t, a, s, n, u, r, l, i, c, v) {
  const p = /* @__PURE__ */ new WeakMap(), d = (h) => {
    let b = p.get(h);
    return b || (typeof n.value == "string" && n.value !== "" ? b = String(Y(n.value, h)) : Array.isArray(n.value) ? b = n.value.map((C) => String(Y(C, h))).join(" ") : b = Object.values(h).map(String).join(" "), p.set(h, b)), b;
  }, m = f(() => {
    if (!t.value && u.value !== "") {
      const h = new RegExp(u.value, "i");
      return a.value.filter((b) => h.test(d(b)));
    }
    return a.value;
  }), P = (h, b) => {
    const C = xa(h) ? h : parseFloat(String(h));
    if (isNaN(C)) return !1;
    if (b.comparison === "between" && Array.isArray(b.criteria)) {
      const [ce, ae] = b.criteria;
      return C >= ce && C <= ae;
    }
    const L = b.criteria;
    switch (b.comparison) {
      case ">":
        return C > L;
      case ">=":
        return C >= L;
      case "<":
        return C < L;
      case "<=":
        return C <= L;
      default:
        return !1;
    }
  }, $ = f(() => {
    var h;
    return (h = o.value) != null && h.length ? m.value.filter(
      (b) => o.value.every((C) => {
        const L = Y(C.field, b);
        return Pa(C) ? C.comparison(L, C.criteria) : ya(C) ? P(L, C) : ba(C) ? C.criteria.includes(L) : C.comparison === "=" ? L === C.criteria : L !== C.criteria;
      })
    ) : m.value;
  }), F = (h, b, C) => h === b ? 0 : h == null ? 1 : b == null ? -1 : h < b ? C ? 1 : -1 : C ? -1 : 1, A = (h, b, C, L) => L < 0 ? h : A(h, b, C, L - 1).sort((ce, ae) => {
    if (!b.slice(0, L).every((Fe) => Y(Fe, ce) === Y(Fe, ae))) return 0;
    const X = b[L], xe = Y(X, ce), oe = Y(X, ae);
    return F(xe, oe, C[L]);
  }), T = f(() => {
    if (t.value) return a.value;
    if (!e.value) return $.value;
    const { sortBy: h, sortDesc: b } = e.value, C = [...$.value];
    return l.value && Array.isArray(h) && Array.isArray(b) ? h.length ? A(C, h, b, h.length - 1) : C : C.sort((L, ce) => {
      const ae = Y(h, L), Q = Y(h, ce);
      return F(ae, Q, b);
    });
  }), ee = f(() => t.value ? r.value : T.value.length), j = f(() => t.value ? !1 : (t.value ? r.value : a.value.length) >= i.value), {
    selectedItems: ue,
    toggleSelectAll: te,
    toggleSelectItem: ke,
    isProcessing: ye,
    selectionProgress: be
  } = Ca(T, s, c, v), G = f({
    get: () => s.value ?? [],
    set: (h) => {
      v("update:itemsSelected", h);
    }
  }), Pe = (h) => h.filter((b) => !c(b)), B = (h) => {
    G.value = h ? Pe(T.value) : G.value = [], h && v("selectAll");
  }, z = (h) => {
    const b = h.checkbox;
    if (delete h.checkbox, delete h.index, b)
      G.value = G.value.filter(
        (C) => JSON.stringify(C) !== JSON.stringify(h)
      ), v("deselectRow", h);
    else {
      const C = G.value;
      C.unshift(h), G.value = C, v("selectRow", h);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: G,
    totalItemsLength: ee,
    toggleSelectAll: (h) => {
      if (!T.value.every((C) => c(C)))
        if (j.value) {
          v("updateSelectionStatus", !0);
          try {
            te(h), v("update:itemsSelected", h ? Array.from(ue.value) : []), h && v("selectAll");
          } finally {
            v("updateSelectionStatus", !1);
          }
        } else
          B(h);
    },
    toggleSelectItem: (h) => {
      c(h) || (j.value ? ke(h) : z(h));
    },
    isProcessing: f(() => j.value && ye.value),
    processProgress: be
  };
}
const Ue = {
  slate: {
    50: "oklch(98.4% 0.003 247.858)",
    100: "oklch(96.8% 0.007 247.896)",
    200: "oklch(92.9% 0.013 255.508)",
    300: "oklch(86.9% 0.022 252.894)",
    400: "oklch(70.4% 0.04 256.788)",
    500: "oklch(55.4% 0.046 257.417)",
    600: "oklch(44.6% 0.043 257.281)",
    700: "oklch(37.2% 0.044 257.287)",
    800: "oklch(27.9% 0.041 260.031)",
    900: "oklch(20.8% 0.042 265.755)",
    950: "oklch(12.9% 0.042 264.695)"
  },
  gray: {
    50: "oklch(98.5% 0.002 247.839)",
    100: "oklch(96.7% 0.003 264.542)",
    200: "oklch(92.8% 0.006 264.531)",
    300: "oklch(87.2% 0.01 258.338)",
    400: "oklch(70.7% 0.022 261.325)",
    500: "oklch(55.1% 0.027 264.364)",
    600: "oklch(44.6% 0.03 256.802)",
    700: "oklch(37.3% 0.034 259.733)",
    800: "oklch(27.8% 0.033 256.848)",
    900: "oklch(21% 0.034 264.665)",
    950: "oklch(13% 0.028 261.692)"
  },
  zinc: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(96.7% 0.001 286.375)",
    200: "oklch(92% 0.004 286.32)",
    300: "oklch(87.1% 0.006 286.286)",
    400: "oklch(70.5% 0.015 286.067)",
    500: "oklch(55.2% 0.016 285.938)",
    600: "oklch(44.2% 0.017 285.786)",
    700: "oklch(37% 0.013 285.805)",
    800: "oklch(27.4% 0.006 286.033)",
    900: "oklch(21% 0.006 285.885)",
    950: "oklch(14.1% 0.005 285.823)"
  },
  neutral: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(97% 0 0)",
    200: "oklch(92.2% 0 0)",
    300: "oklch(87% 0 0)",
    400: "oklch(70.8% 0 0)",
    500: "oklch(55.6% 0 0)",
    600: "oklch(43.9% 0 0)",
    700: "oklch(37.1% 0 0)",
    800: "oklch(26.9% 0 0)",
    900: "oklch(20.5% 0 0)",
    950: "oklch(14.5% 0 0)"
  },
  stone: {
    50: "oklch(98.5% 0.001 106.423)",
    100: "oklch(97% 0.001 106.424)",
    200: "oklch(92.3% 0.003 48.717)",
    300: "oklch(86.9% 0.005 56.366)",
    400: "oklch(70.9% 0.01 56.259)",
    500: "oklch(55.3% 0.013 58.071)",
    600: "oklch(44.4% 0.011 73.639)",
    700: "oklch(37.4% 0.01 67.558)",
    800: "oklch(26.8% 0.007 34.298)",
    900: "oklch(21.6% 0.006 56.043)",
    950: "oklch(14.7% 0.004 49.25)"
  },
  red: {
    50: "oklch(97.1% 0.013 17.38)",
    100: "oklch(93.6% 0.032 17.717)",
    200: "oklch(88.5% 0.062 18.334)",
    300: "oklch(80.8% 0.114 19.571)",
    400: "oklch(70.4% 0.191 22.216)",
    500: "oklch(63.7% 0.237 25.331)",
    600: "oklch(57.7% 0.245 27.325)",
    700: "oklch(50.5% 0.213 27.518)",
    800: "oklch(44.4% 0.177 26.899)",
    900: "oklch(39.6% 0.141 25.723)",
    950: "oklch(25.8% 0.092 26.042)"
  },
  orange: {
    50: "oklch(98% 0.016 73.684)",
    100: "oklch(95.4% 0.038 75.164)",
    200: "oklch(90.1% 0.076 70.697)",
    300: "oklch(83.7% 0.128 66.29)",
    400: "oklch(75% 0.183 55.934)",
    500: "oklch(70.5% 0.213 47.604)",
    600: "oklch(64.6% 0.222 41.116)",
    700: "oklch(55.3% 0.195 38.402)",
    800: "oklch(47% 0.157 37.304)",
    900: "oklch(40.8% 0.123 38.172)",
    950: "oklch(26.6% 0.079 36.259)"
  },
  amber: {
    50: "oklch(98.7% 0.022 95.277)",
    100: "oklch(96.2% 0.059 95.617)",
    200: "oklch(92.4% 0.12 95.746)",
    300: "oklch(87.9% 0.169 91.605)",
    400: "oklch(82.8% 0.189 84.429)",
    500: "oklch(76.9% 0.188 70.08)",
    600: "oklch(66.6% 0.179 58.318)",
    700: "oklch(55.5% 0.163 48.998)",
    800: "oklch(47.3% 0.137 46.201)",
    900: "oklch(41.4% 0.112 45.904)",
    950: "oklch(27.9% 0.077 45.635)"
  },
  yellow: {
    50: "oklch(98.7% 0.026 102.212)",
    100: "oklch(97.3% 0.071 103.193)",
    200: "oklch(94.5% 0.129 101.54)",
    300: "oklch(90.5% 0.182 98.111)",
    400: "oklch(85.2% 0.199 91.936)",
    500: "oklch(79.5% 0.184 86.047)",
    600: "oklch(68.1% 0.162 75.834)",
    700: "oklch(55.4% 0.135 66.442)",
    800: "oklch(47.6% 0.114 61.907)",
    900: "oklch(42.1% 0.095 57.708)",
    950: "oklch(28.6% 0.066 53.813)"
  },
  lime: {
    50: "oklch(98.6% 0.031 120.757)",
    100: "oklch(96.7% 0.067 122.328)",
    200: "oklch(93.8% 0.127 124.321)",
    300: "oklch(89.7% 0.196 126.665)",
    400: "oklch(84.1% 0.238 128.85)",
    500: "oklch(76.8% 0.233 130.85)",
    600: "oklch(64.8% 0.2 131.684)",
    700: "oklch(53.2% 0.157 131.589)",
    800: "oklch(45.3% 0.124 130.933)",
    900: "oklch(40.5% 0.101 131.063)",
    950: "oklch(27.4% 0.072 132.109)"
  },
  green: {
    50: "oklch(98.2% 0.018 155.826)",
    100: "oklch(96.2% 0.044 156.743)",
    200: "oklch(92.5% 0.084 155.995)",
    300: "oklch(87.1% 0.15 154.449)",
    400: "oklch(79.2% 0.209 151.711)",
    500: "oklch(72.3% 0.219 149.579)",
    600: "oklch(62.7% 0.194 149.214)",
    700: "oklch(52.7% 0.154 150.069)",
    800: "oklch(44.8% 0.119 151.328)",
    900: "oklch(39.3% 0.095 152.535)",
    950: "oklch(26.6% 0.065 152.934)"
  },
  emerald: {
    50: "oklch(97.9% 0.021 166.113)",
    100: "oklch(95% 0.052 163.051)",
    200: "oklch(90.5% 0.093 164.15)",
    300: "oklch(84.5% 0.143 164.978)",
    400: "oklch(76.5% 0.177 163.223)",
    500: "oklch(69.6% 0.17 162.48)",
    600: "oklch(59.6% 0.145 163.225)",
    700: "oklch(50.8% 0.118 165.612)",
    800: "oklch(43.2% 0.095 166.913)",
    900: "oklch(37.8% 0.077 168.94)",
    950: "oklch(26.2% 0.051 172.552)"
  },
  teal: {
    50: "oklch(98.4% 0.014 180.72)",
    100: "oklch(95.3% 0.051 180.801)",
    200: "oklch(91% 0.096 180.426)",
    300: "oklch(85.5% 0.138 181.071)",
    400: "oklch(77.7% 0.152 181.912)",
    500: "oklch(70.4% 0.14 182.503)",
    600: "oklch(60% 0.118 184.704)",
    700: "oklch(51.1% 0.096 186.391)",
    800: "oklch(43.7% 0.078 188.216)",
    900: "oklch(38.6% 0.063 188.416)",
    950: "oklch(27.7% 0.046 192.524)"
  },
  cyan: {
    50: "oklch(98.4% 0.019 200.873)",
    100: "oklch(95.6% 0.045 203.388)",
    200: "oklch(91.7% 0.08 205.041)",
    300: "oklch(86.5% 0.127 207.078)",
    400: "oklch(78.9% 0.154 211.53)",
    500: "oklch(71.5% 0.143 215.221)",
    600: "oklch(60.9% 0.126 221.723)",
    700: "oklch(52% 0.105 223.128)",
    800: "oklch(45% 0.085 224.283)",
    900: "oklch(39.8% 0.07 227.392)",
    950: "oklch(30.2% 0.056 229.695)"
  },
  sky: {
    50: "oklch(97.7% 0.013 236.62)",
    100: "oklch(95.1% 0.026 236.824)",
    200: "oklch(90.1% 0.058 230.902)",
    300: "oklch(82.8% 0.111 230.318)",
    400: "oklch(74.6% 0.16 232.661)",
    500: "oklch(68.5% 0.169 237.323)",
    600: "oklch(58.8% 0.158 241.966)",
    700: "oklch(50% 0.134 242.749)",
    800: "oklch(44.3% 0.11 240.79)",
    900: "oklch(39.1% 0.09 240.876)",
    950: "oklch(29.3% 0.066 243.157)"
  },
  blue: {
    50: "oklch(97% 0.014 254.604)",
    100: "oklch(93.2% 0.032 255.585)",
    200: "oklch(88.2% 0.059 254.128)",
    300: "oklch(80.9% 0.105 251.813)",
    400: "oklch(70.7% 0.165 254.624)",
    500: "oklch(62.3% 0.214 259.815)",
    600: "oklch(54.6% 0.245 262.881)",
    700: "oklch(48.8% 0.243 264.376)",
    800: "oklch(42.4% 0.199 265.638)",
    900: "oklch(37.9% 0.146 265.522)",
    950: "oklch(28.2% 0.091 267.935)"
  },
  indigo: {
    50: "oklch(96.2% 0.018 272.314)",
    100: "oklch(93% 0.034 272.788)",
    200: "oklch(87% 0.065 274.039)",
    300: "oklch(78.5% 0.115 274.713)",
    400: "oklch(67.3% 0.182 276.935)",
    500: "oklch(58.5% 0.233 277.117)",
    600: "oklch(51.1% 0.262 276.966)",
    700: "oklch(45.7% 0.24 277.023)",
    800: "oklch(39.8% 0.195 277.366)",
    900: "oklch(35.9% 0.144 278.697)",
    950: "oklch(25.7% 0.09 281.288)"
  },
  violet: {
    50: "oklch(96.9% 0.016 293.756)",
    100: "oklch(94.3% 0.029 294.588)",
    200: "oklch(89.4% 0.057 293.283)",
    300: "oklch(81.1% 0.111 293.571)",
    400: "oklch(70.2% 0.183 293.541)",
    500: "oklch(60.6% 0.25 292.717)",
    600: "oklch(54.1% 0.281 293.009)",
    700: "oklch(49.1% 0.27 292.581)",
    800: "oklch(43.2% 0.232 292.759)",
    900: "oklch(38% 0.189 293.745)",
    950: "oklch(28.3% 0.141 291.089)"
  },
  purple: {
    50: "oklch(97.7% 0.014 308.299)",
    100: "oklch(94.6% 0.033 307.174)",
    200: "oklch(90.2% 0.063 306.703)",
    300: "oklch(82.7% 0.119 306.383)",
    400: "oklch(71.4% 0.203 305.504)",
    500: "oklch(62.7% 0.265 303.9)",
    600: "oklch(55.8% 0.288 302.321)",
    700: "oklch(49.6% 0.265 301.924)",
    800: "oklch(43.8% 0.218 303.724)",
    900: "oklch(38.1% 0.176 304.987)",
    950: "oklch(29.1% 0.149 302.717)"
  },
  fuchsia: {
    50: "oklch(97.7% 0.017 320.058)",
    100: "oklch(95.2% 0.037 318.852)",
    200: "oklch(90.3% 0.076 319.62)",
    300: "oklch(83.3% 0.145 321.434)",
    400: "oklch(74% 0.238 322.16)",
    500: "oklch(66.7% 0.295 322.15)",
    600: "oklch(59.1% 0.293 322.896)",
    700: "oklch(51.8% 0.253 323.949)",
    800: "oklch(45.2% 0.211 324.591)",
    900: "oklch(40.1% 0.17 325.612)",
    950: "oklch(29.3% 0.136 325.661)"
  },
  pink: {
    50: "oklch(97.1% 0.014 343.198)",
    100: "oklch(94.8% 0.028 342.258)",
    200: "oklch(89.9% 0.061 343.231)",
    300: "oklch(82.3% 0.12 346.018)",
    400: "oklch(71.8% 0.202 349.761)",
    500: "oklch(65.6% 0.241 354.308)",
    600: "oklch(59.2% 0.249 0.584)",
    700: "oklch(52.5% 0.223 3.958)",
    800: "oklch(45.9% 0.187 3.815)",
    900: "oklch(40.8% 0.153 2.432)",
    950: "oklch(28.4% 0.109 3.907)"
  },
  rose: {
    50: "oklch(96.9% 0.015 12.422)",
    100: "oklch(94.1% 0.03 12.58)",
    200: "oklch(89.2% 0.058 10.001)",
    300: "oklch(81% 0.117 11.638)",
    400: "oklch(71.2% 0.194 13.428)",
    500: "oklch(64.5% 0.246 16.439)",
    600: "oklch(58.6% 0.253 17.585)",
    700: "oklch(51.4% 0.222 16.935)",
    800: "oklch(45.5% 0.188 13.697)",
    900: "oklch(41% 0.159 10.272)",
    950: "oklch(27.1% 0.105 12.094)"
  }
};
function Je(e) {
  return Ue[e];
}
function kt(e) {
  const o = e.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
  if (!o) return null;
  const [t, a, s, n] = o.map(Number);
  return { lightness: a, chroma: s, hue: n };
}
function Ia(e) {
  e = e.replace(/^#/, ""), e.length === 3 && (e = e.split("").map((s) => s + s).join(""));
  const o = parseInt(e.slice(0, 2), 16) / 255, t = parseInt(e.slice(2, 4), 16) / 255, a = parseInt(e.slice(4, 6), 16) / 255;
  return { r: o, g: t, b: a };
}
function Na(e) {
  const { r: o, g: t, b: a } = e, s = o <= 0.04045 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4), n = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), u = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), r = 0.4124 * s + 0.3576 * n + 0.1805 * u, l = 0.2126 * s + 0.7152 * n + 0.0722 * u, i = 0.0193 * s + 0.1192 * n + 0.9505 * u, c = 0.95047, v = 1, p = 1.08883, d = r > 8856e-6 ? Math.pow(r / c, 1 / 3) : 7.787 * r / c + 16 / 116, m = l > 8856e-6 ? Math.pow(l / v, 1 / 3) : 7.787 * l / v + 16 / 116, P = i > 8856e-6 ? Math.pow(i / p, 1 / 3) : 7.787 * i / p + 16 / 116, $ = 116 * m - 16, F = 500 * (d - m), A = 200 * (m - P);
  return { l: $, a: F, b: A };
}
function $a(e) {
  const { l: o, a: t, b: a } = e, s = Math.sqrt(t * t + a * a);
  let n = Math.atan2(a, t) * 180 / Math.PI;
  return n < 0 && (n += 360), { l: o, c: s, h: n };
}
function Fa(e) {
  const o = Ia(e), t = Na(o), a = $a(t);
  return {
    lightness: a.l,
    chroma: Math.min(a.c / 150, 0.4),
    // 限制在合理範圍內
    hue: a.h
  };
}
function Qe(e) {
  return e.startsWith("oklch(");
}
function Xe(e) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(e);
}
function Ba(e, o) {
  const t = Math.min(
    Math.abs(e.hue - o.hue),
    360 - Math.abs(e.hue - o.hue)
  ), a = t > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((e.lightness - o.lightness) * 1.5, 2) + Math.pow((e.chroma - o.chroma) * 2, 2) + Math.pow(t / 360 * a, 2) * 100
  );
}
function ft(e, o) {
  let t = "indigo", a = "500", s = 1 / 0;
  for (const [n, u] of Object.entries(o))
    for (const [r, l] of Object.entries(u)) {
      if (!["300", "400", "500", "600", "700"].includes(r)) continue;
      const i = kt(l);
      if (!i) continue;
      const c = Ba(e, i);
      c < s && (s = c, t = n, a = r);
    }
  return { color: t, shade: a, distance: s };
}
function yt(e) {
  const o = "indigo";
  if (Qe(e)) {
    const t = kt(e);
    return t ? ft(t, Ue).color : o;
  }
  if (Xe(e)) {
    const t = Fa(e);
    return ft(t, Ue).color;
  }
  return e;
}
function Ra(e) {
  const o = Je(e), t = {};
  return Object.entries(o).forEach(([a, s]) => {
    t[`--vdt-theme-${a}`] = s;
  }), t;
}
function Ma(e) {
  const o = typeof e == "string" && (Xe(e) || Qe(e)) ? yt(e) : e, t = Ra(o), a = document.documentElement;
  Object.entries(t).forEach(([s, n]) => {
    a.style.setProperty(s, n);
  });
}
function La(e) {
  const o = typeof e == "string" && (Xe(e) || Qe(e)) ? yt(e) : e;
  return Ma(o), {
    color: o,
    mainColor: Je(o)[500] || Je(o)[400]
  };
}
const Aa = {}, Ta = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Ea(e, o) {
  return k(), x("svg", Ta, o[0] || (o[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Oa = /* @__PURE__ */ pe(Aa, [["render", Ea]]), Da = {}, Ha = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function ja(e, o) {
  return k(), x("svg", Ha, o[0] || (o[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const za = /* @__PURE__ */ pe(Da, [["render", ja]]), Wa = {}, qa = { class: "px-3 py-1.5" };
function Va(e, o) {
  return k(), x("span", qa, o[0] || (o[0] = [
    w("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      w("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Ka = /* @__PURE__ */ pe(Wa, [["render", Va]]), Ua = {}, Ja = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ga(e, o) {
  return k(), x("svg", Ja, o[0] || (o[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Za = /* @__PURE__ */ pe(Ua, [["render", Ga]]), Qa = {}, Xa = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ya(e, o) {
  return k(), x("svg", Xa, o[0] || (o[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const _a = /* @__PURE__ */ pe(Qa, [["render", Ya]]), eo = /* @__PURE__ */ E({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(e) {
    return (o, t) => (k(), x("span", {
      key: o.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        o.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      H(_a, {
        class: S({ "transform rotate-180": o.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), to = ["checked", "disabled", "aria-checked"], ao = {
  class: "h-4 w-4 text-white stroke-3",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, oo = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, so = /* @__PURE__ */ E({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e) {
    const o = e, t = f(() => o.checked), a = f(() => o.partial);
    return (s, n) => (k(), x("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !s.disabled && "cursor-pointer group",
        s.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: n[0] || (n[0] = Ze((u) => !s.disabled && s.$emit("change"), ["stop", "prevent"]))
    }, [
      w("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: t.value,
        disabled: s.disabled,
        "aria-checked": t.value
      }, null, 8, to),
      w("div", {
        class: S(["h-4 w-4 rounded-sm transition-all duration-200 border", [
          // Base states
          t.value && !a.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !s.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          a.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !s.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          !t.value && !a.value && [
            "border-gray-300 bg-white",
            !s.disabled && "group-hover:border-vdt-primary-300"
          ],
          // Focus states
          !s.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-vdt-primary-500/50"
        ]])
      }, [
        Ve((k(), x("svg", ao, n[1] || (n[1] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Ke, t.value && !a.value]
        ]),
        Ve((k(), x("svg", oo, n[2] || (n[2] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Ke, a.value]
        ])
      ], 2)
    ], 2));
  }
}), bt = /* @__PURE__ */ E({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(e, { emit: o }) {
    const t = o;
    return (a, s) => (k(), _(so, {
      checked: a.checked,
      disabled: a.disabled,
      partial: !1,
      onChange: s[0] || (s[0] = (n) => t("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), lo = /* @__PURE__ */ E({
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
  setup(e, { emit: o }) {
    const t = e, a = f(() => t.status === "allSelected"), s = f(() => t.status === "partSelected"), n = o;
    return (u, r) => (k(), _(bt, {
      checked: a.value,
      partial: s.value,
      disabled: e.disabled,
      onChange: r[0] || (r[0] = (l) => n("change", !a.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), no = {
  key: 1,
  class: "items-center gap-2"
}, ro = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, io = /* @__PURE__ */ E({
  __name: "TableHeaderCell",
  props: {
    header: {
      type: Object,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    fixedDistance: String,
    // lastFixedColumn: String,
    lastLeftFixedColumn: String,
    firstRightFixedColumn: String,
    headerItemClassName: {
      type: [String, Function],
      default: ""
    },
    areAllVisibleRowsDisabled: Boolean,
    multipleSelectStatus: {
      type: String,
      default: "noneSelected"
    },
    multiSort: Boolean,
    isMultiSorting: {
      type: Function,
      required: !0
    },
    getMultiSortNumber: {
      type: Function,
      required: !0
    }
  },
  emits: ["headerClick", "toggleSelectAll"],
  setup(e, { emit: o }) {
    const t = o, a = vt(), s = (u) => [
      `header-${u.value}`,
      `header-${u.value.toLowerCase()}`,
      "header"
    ].find((l) => a[l]) || "header", n = (u) => {
      u.sortable && u.sortType && t("headerClick", u);
    };
    return (u, r) => (k(), x("th", {
      style: Me(e.fixedDistance),
      class: S(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-200 group", [
        "px-4 py-3 font-semibold tracking-wider group",
        {
          "cursor-pointer hover:bg-gray-300": e.header.sortable,
          "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.lastLeftFixedColumn,
          "shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]": e.header.value === e.firstRightFixedColumn
        },
        e.header.sortable && {
          "bg-gray-200": e.header.sortType === "none",
          "bg-gray-300": e.header.sortType && ["desc", "asc"].includes(e.header.sortType)
        },
        typeof e.headerItemClassName == "string" ? e.headerItemClassName : e.headerItemClassName(e.header, e.index + 1)
      ]]),
      onClick: r[1] || (r[1] = Ze((l) => n(e.header), ["stop"]))
    }, [
      e.header.text === "checkbox" ? (k(), _(lo, {
        key: 0,
        disabled: e.areAllVisibleRowsDisabled,
        status: e.multipleSelectStatus,
        onChange: r[0] || (r[0] = (l) => u.$emit("toggleSelectAll", l))
      }, null, 8, ["disabled", "status"])) : (k(), x("div", no, [
        N(u.$slots, s(e.header), W(ne({ header: e.header, index: e.index, sortable: e.header.sortable })), () => [
          w("span", null, V(e.header.text), 1)
        ]),
        e.header.sortable ? (k(), _(y(eo), {
          key: 0,
          "sort-type": e.header.sortType || "none"
        }, null, 8, ["sort-type"])) : D("", !0),
        e.multiSort && e.isMultiSorting(e.header.value) ? (k(), x("span", ro, V(e.getMultiSortNumber(e.header.value)), 1)) : D("", !0)
      ]))
    ], 6));
  }
}), uo = /* @__PURE__ */ E({
  __name: "TableHeader",
  props: {
    headers: {
      type: Array,
      required: !0
    },
    hideHeader: Boolean,
    fixedHeader: Boolean,
    headerClassName: String,
    borderCell: Boolean,
    lastLeftFixedColumn: String,
    firstRightFixedColumn: String,
    headerItemClassName: {
      type: [String, Function],
      default: ""
    },
    areAllVisibleRowsDisabled: Boolean,
    multipleSelectStatus: String,
    multiSort: Boolean,
    isMultiSorting: {
      type: Function,
      required: !0
    },
    getMultiSortNumber: {
      type: Function,
      required: !0
    },
    getFixedDistance: {
      type: Function,
      required: !0
    }
  },
  emits: ["headerClick", "toggleSelectAll"],
  setup(e, { emit: o }) {
    const t = o, a = (n) => {
      t("headerClick", n);
    }, s = (n) => {
      t("toggleSelectAll", n);
    };
    return (n, u) => e.headers.length && !e.hideHeader ? (k(), x("thead", {
      key: 0,
      class: S(["vdt-thead", [
        "text-sm text-slate-700 uppercase text-nowrap text-left",
        { "sticky top-0 z-10": e.fixedHeader },
        e.headerClassName
      ]])
    }, [
      w("tr", {
        class: S(["vdt-thead-tr", [{ "divide-x divide-gray-200": e.borderCell }]])
      }, [
        (k(!0), x(ie, null, J(e.headers, (r, l) => (k(), _(io, {
          key: l,
          header: r,
          index: l,
          "fixed-distance": e.getFixedDistance(r.value),
          "last-left-fixed-column": e.lastLeftFixedColumn,
          "first-right-fixed-column": e.firstRightFixedColumn,
          "header-item-class-name": e.headerItemClassName,
          "are-all-visible-rows-disabled": e.areAllVisibleRowsDisabled,
          "multiple-select-status": e.multipleSelectStatus,
          "multi-sort": e.multiSort,
          "is-multi-sorting": e.isMultiSorting,
          "get-multi-sort-number": e.getMultiSortNumber,
          onHeaderClick: a,
          onToggleSelectAll: s
        }, ve({ _: 2 }, [
          J(n.$slots, (i, c) => ({
            name: c,
            fn: re((v) => [
              N(n.$slots, c, q({ ref_for: !0 }, v))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : D("", !0);
  }
}), co = /* @__PURE__ */ E({
  __name: "TableBodyCell",
  props: {
    column: {},
    item: {},
    index: {},
    style: {},
    isDisabled: { type: Boolean },
    expandColumn: {},
    isExpanded: { type: Boolean },
    bodyItemClassName: { type: [String, Function] },
    getFixedDistance: { type: Function },
    getFixedColumnClasses: { type: Function }
  },
  emits: ["toggle-select", "toggle-expand"],
  setup(e, { emit: o }) {
    const t = e, a = o, s = f(() => t.isDisabled ?? !1), n = f(() => typeof t.bodyItemClassName == "function" ? t.bodyItemClassName(t.column, t.index) : t.bodyItemClassName), u = f(
      () => t.column === "expand" || t.column === t.expandColumn
    ), r = f(() => {
      if (t.getFixedDistance)
        return t.getFixedDistance(t.column, "td");
    }), l = f(() => t.getFixedColumnClasses ? t.getFixedColumnClasses(t.column) || [] : []), i = f(() => {
      let d = t.style || "";
      return r.value && (d += r.value), l.value.length > 0 && (d += " background-color: inherit;"), d;
    }), c = () => {
      u.value && t.expandColumn === "" && a("toggle-expand", event);
    }, v = (d) => {
      a("toggle-expand", d);
    }, p = () => {
      a("toggle-select");
    };
    return (d, m) => (k(), x("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": d.column === "expand" && d.expandColumn === "" },
        ...l.value,
        n.value
      ]]),
      style: Me(i.value),
      onClick: c
    }, [
      d.column === "checkbox" ? (k(), x(ie, { key: 0 }, [
        d.column === "checkbox" ? N(d.$slots, "selection-checkbox", W(q({ key: 0 }, { item: d.item, index: d.index, isDisabled: s.value, toggleSelectItem: p })), () => [
          H(bt, {
            checked: !!d.item.checkbox,
            disabled: s.value,
            onChange: p
          }, null, 8, ["checked", "disabled"])
        ]) : D("", !0)
      ], 64)) : u.value ? N(d.$slots, "expand-button", W(q({ key: 1 }, { item: d.item, expanded: d.isExpanded, toggle: v })), () => [
        w("button", {
          onClick: Ze(v, ["stop"]),
          class: "inline-flex items-center"
        }, [
          H(y(Za), {
            class: S({ "transform rotate-90": d.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : N(d.$slots, `item-${d.column}`, W(q({ key: 2 }, d.item)), () => [
        N(d.$slots, `item-${d.column.toLowerCase()}`, W(ne(d.item)), () => [
          N(d.$slots, "item", W(ne({ column: d.column, item: d.item })), () => [
            Le(V(y(wa)(d.column, d.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), go = /* @__PURE__ */ E({
  __name: "TableBodyRow",
  props: {
    item: {},
    index: {},
    columns: {},
    alternating: { type: Boolean },
    noHover: { type: Boolean },
    borderRow: { type: Boolean },
    borderCell: { type: Boolean },
    bodyRowClassName: { type: [String, Function] },
    isExpanded: { type: Boolean },
    isDisabled: { type: Boolean },
    expandColumn: {},
    getFixedDistance: { type: Function },
    getFixedColumnClasses: { type: Function },
    bodyItemClassName: { type: [String, Function] }
  },
  emits: ["click", "dblclick", "contextmenu", "toggle-expand", "toggle-select"],
  setup(e, { emit: o }) {
    const t = e, a = o, s = f(() => typeof t.bodyRowClassName == "function" ? t.bodyRowClassName(t.item, t.index) : t.bodyRowClassName), n = (l) => {
      a("click", l, t.item, t.index);
    }, u = (l) => {
      a("dblclick", l, t.item, t.index);
    }, r = (l) => {
      a("contextmenu", l, t.item);
    };
    return (l, i) => (k(), x("tr", {
      class: S(["vdt-tbody-tr transition-colors", [
        { "bg-white": l.alternating && l.index % 2 === 0 },
        { "bg-gray-50": !l.alternating || l.index % 2 === 1 },
        { "hover:bg-gray-100": !l.noHover },
        { "divide-x divide-gray-200": l.borderCell },
        { "border-b border-gray-200 last:border-b-0 first:border-t": l.borderRow },
        s.value
      ]]),
      onClick: n,
      onDblclick: u,
      onContextmenu: r
    }, [
      N(l.$slots, "prepend"),
      (k(!0), x(ie, null, J(l.columns, (c, v) => (k(), _(co, {
        key: v,
        column: c,
        item: l.item,
        index: l.index,
        "get-fixed-distance": l.getFixedDistance,
        "get-fixed-column-classes": l.getFixedColumnClasses,
        "is-disabled": l.isDisabled,
        "expand-column": l.expandColumn,
        "is-expanded": l.isExpanded,
        "body-item-class-name": l.bodyItemClassName,
        onToggleExpand: i[0] || (i[0] = (p) => l.$emit("toggle-expand", p, l.index, l.item)),
        onToggleSelect: i[1] || (i[1] = () => l.$emit("toggle-select", l.item))
      }, ve({ _: 2 }, [
        J(l.$slots, (p, d) => ({
          name: d,
          fn: re((m) => [
            N(l.$slots, d, q({ ref_for: !0 }, m))
          ])
        }))
      ]), 1032, ["column", "item", "index", "get-fixed-distance", "get-fixed-column-classes", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]))), 128)),
      N(l.$slots, "append")
    ], 34));
  }
}), ho = {}, fo = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" };
function po(e, o) {
  return k(), x("div", fo, o[0] || (o[0] = [
    w("div", { class: "absolute h-[3px] w-2/5 animate-loading-line bg-vdt-primary-500" }, null, -1)
  ]));
}
const mo = /* @__PURE__ */ pe(ho, [["render", po], ["__scopeId", "data-v-9ef81a40"]]), vo = ["colspan"], ko = { class: "overflow-hidden" }, yo = /* @__PURE__ */ E({
  __name: "TableExpandRow",
  props: {
    item: {},
    index: {},
    columnsCount: {},
    loading: { type: Boolean },
    isExpanded: { type: Boolean },
    bodyExpandRowClassName: { type: [String, Function] }
  },
  setup(e) {
    const o = e, t = f(() => typeof o.bodyExpandRowClassName == "function" ? o.bodyExpandRowClassName(o.item, o.index) : o.bodyExpandRowClassName);
    return (a, s) => (k(), x("tr", {
      class: S(["vdt-expand-row border-0", [t.value, { "bg-gray-50": (a.index + 1) % 2 === 0, "border-t": a.isExpanded }]])
    }, [
      w("td", {
        colspan: a.columnsCount,
        class: "relative p-0"
      }, [
        a.loading ? (k(), _(mo, {
          key: 0,
          class: "mb-4"
        })) : D("", !0),
        w("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": a.isExpanded }]])
        }, [
          w("div", ko, [
            N(a.$slots, "default")
          ])
        ], 2)
      ], 8, vo)
    ], 2));
  }
}), bo = { class: "flex items-center gap-2 text-sm text-gray-700" }, Po = { class: "relative inline-block min-w-[70px]" }, xo = ["aria-expanded"], wo = { class: "block truncate" }, Co = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, So = ["aria-selected", "onClick"], Io = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-vdt-primary-600"
}, No = /* @__PURE__ */ E({
  __name: "RowsPerPageSelector",
  props: {
    modelValue: {
      type: Number,
      requilime: !0
    },
    rowsItems: {
      type: Array,
      required: !0
    },
    message: {
      type: String,
      default: "Rows per page:"
    }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: o }) {
    const t = e, a = o, s = Z(!1), n = Z(!1), u = f({
      get: () => t.modelValue,
      set: (p) => a("update:modelValue", p)
    }), r = Vt("dataTable");
    de(s, (p) => {
      if (p && (r != null && r.value)) {
        const d = window.innerHeight, m = r.value.getBoundingClientRect(), P = d - (m.height + m.top);
        n.value = P <= 100;
      }
    });
    const l = (p) => {
      u.value = p, s.value = !1;
    }, i = () => {
      s.value = !s.value;
    }, c = (p) => {
      p.target.closest(".relative") || (s.value = !1);
    }, v = (p) => {
      const d = p.relatedTarget;
      d != null && d.closest(".relative") || (s.value = !1);
    };
    return Ge(() => {
      document.addEventListener("click", c);
    }), Kt(() => {
      document.removeEventListener("click", c);
    }), (p, d) => (k(), x("div", bo, [
      Le(V(e.message) + " ", 1),
      w("div", Po, [
        w("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-gray-300", [
            "focus:border-vdt-primary-500 focus:outline-hidden focus:ring-1 focus:ring-vdt-primary-500",
            s.value ? "ring-1 ring-vdt-primary-500 border-vdt-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: i,
          "aria-haspopup": "listbox",
          "aria-expanded": s.value
        }, [
          w("span", wo, V(u.value), 1),
          w("span", Co, [
            (k(), x("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": s.value }]),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor"
            }, d[0] || (d[0] = [
              w("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 9l-7 7-7-7"
              }, null, -1)
            ]), 2))
          ])
        ], 10, xo),
        H(Ut, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: re(() => [
            s.value ? (k(), x("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-hidden", { "bottom-full mb-1": n.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: v
            }, [
              (k(!0), x(ie, null, J(e.rowsItems, (m) => (k(), x("li", {
                key: m,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  m === u.value ? "text-vdt-primary-800 bg-vdt-primary-100 font-semibold" : "text-gray-900 hover:bg-gray-100"
                ]]),
                role: "option",
                "aria-selected": m === u.value,
                onClick: (P) => l(m)
              }, [
                w("span", {
                  class: S(["block", { "font-medium": m === u.value }])
                }, V(m), 3),
                m === u.value ? (k(), x("span", Io, d[1] || (d[1] = [
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
              ], 10, So))), 128))
            ], 34)) : D("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), $o = { class: "text-sm text-gray-700" }, Fo = /* @__PURE__ */ E({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(e) {
    return (o, t) => (k(), x("div", $o, [
      N(o.$slots, "default", {
        firstIndex: o.currentPageFirstIndex,
        lastIndex: o.currentPageLastIndex,
        total: o.totalItemsLength,
        separator: o.rowsOfPageSeparatorMessage
      }, () => [
        Le(V(`${o.currentPageFirstIndex}–${o.currentPageLastIndex}`) + " " + V(o.rowsOfPageSeparatorMessage) + " " + V(o.totalItemsLength), 1)
      ])
    ]));
  }
}), Bo = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, Ro = ["disabled"], Mo = ["disabled"], pt = /* @__PURE__ */ E({
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
  setup(e, { emit: o }) {
    const t = o;
    return (a, s) => (k(), x("div", Bo, [
      w("button", {
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
        onClick: s[0] || (s[0] = (n) => t("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        H(y(za), {
          class: S({ "opacity-50": e.isFirstPage })
        }, null, 8, ["class"])
      ], 10, Ro),
      N(a.$slots, "buttonsPagination"),
      w("button", {
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
        onClick: s[1] || (s[1] = (n) => t("clickNextPage")),
        "aria-label": "Next page"
      }, [
        H(y(Oa), {
          class: S({ "opacity-50": e.isLastPage })
        }, null, 8, ["class"])
      ], 10, Mo)
    ]));
  }
}), Lo = {
  class: "vdt-pagination inline-flex rounded-md shadow-xs",
  role: "navigation",
  "aria-label": "Pagination"
}, Ao = ["onClick"], fe = 7, To = /* @__PURE__ */ E({
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
  setup(e, { emit: o }) {
    const t = e, a = o, s = (u) => {
      u.type === "button" && !u.active && a("updatePage", u.page);
    }, n = f(() => {
      const u = [], { maxPaginationNumber: r, currentPaginationNumber: l } = t;
      if (r <= fe) {
        for (let i = 1; i <= r; i += 1)
          u.push({
            type: "button",
            page: i,
            active: i === l,
            activePrev: i + 1 === l
          });
        return u;
      }
      if ([1, 2, r, r - 1].includes(l))
        for (let i = 1; i <= fe; i += 1)
          if (i <= 3)
            u.push({
              type: "button",
              page: i,
              active: i === l,
              activePrev: i + 1 === l
            });
          else if (i === 4)
            u.push({ type: "omission" });
          else {
            const c = r - (fe - i);
            u.push({
              type: "button",
              page: c,
              active: c === l,
              activePrev: c + 1 === l
            });
          }
      else if ([3, 4].includes(l))
        for (let i = 1; i <= fe; i += 1)
          i <= 5 ? u.push({
            type: "button",
            page: i,
            active: i === l,
            activePrev: i + 1 === l
          }) : i === 6 ? u.push({ type: "omission" }) : u.push({
            type: "button",
            page: r,
            active: r === l,
            activePrev: !1
          });
      else if ([r - 2, r - 3].includes(l))
        for (let i = 1; i <= fe; i += 1)
          if (i === 1)
            u.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (i === 2)
            u.push({ type: "omission" });
          else {
            const c = r - (fe - i);
            u.push({
              type: "button",
              page: c,
              active: c === l,
              activePrev: c + 1 === l
            });
          }
      else
        for (let i = 1; i <= fe; i += 1)
          if (i === 1)
            u.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (i === 2 || i === 6)
            u.push({ type: "omission" });
          else if (i === 7)
            u.push({
              type: "button",
              page: r,
              active: r === l,
              activePrev: !1
            });
          else {
            const c = 4 - i, v = l - c;
            u.push({
              type: "button",
              page: v,
              active: v === l,
              activePrev: v + 1 === l
            });
          }
      return u;
    });
    return (u, r) => (k(), x("div", Lo, [
      (k(!0), x(ie, null, J(n.value, (l, i) => (k(), x("div", {
        key: i,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm",
          // First item styles
          i === 0 && "rounded-l-md",
          // Last item styles
          i === n.value.length - 1 && "rounded-r-md",
          // Button specific styles
          l.type === "button" && [
            "border border-gray-300",
            // Active state
            l.active ? [
              "z-10",
              "bg-vdt-primary-500 border-vdt-primary-500 text-white",
              "relative"
            ] : [
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-50",
              "focus:z-10 focus:outline-hidden focus:ring-1",
              "focus:ring-vdt-primary-500",
              "focus:border-vdt-primary-500"
            ],
            // Disable hover effect for active button
            !l.active && "cursor-pointer",
            // Connect borders for middle buttons
            i !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          l.type === "omission" && [
            "bg-white border border-gray-300 text-gray-700",
            i !== 0 && "-ml-px"
          ]
        ]]),
        onClick: (c) => s(l)
      }, [
        l.type === "button" ? (k(), x("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": l.active }])
        }, V(l.page), 3)) : (k(), _(y(Ka), { key: 1 }))
      ], 10, Ao))), 128))
    ]));
  }
}), Eo = { class: "flex-1 flex justify-center" }, Oo = { class: "text-sm text-gray-600 px-3" }, Do = { class: "flex-1 flex items-center justify-start" }, Ho = {
  key: 0,
  class: "text-sm text-gray-600"
}, jo = { class: "flex-1 flex items-center justify-center" }, zo = {
  key: 0,
  class: "text-sm text-gray-600"
}, Wo = { class: "flex-1 flex items-center justify-end" }, qo = /* @__PURE__ */ E({
  __name: "TableFooter",
  props: {
    hideRowsPerPage: { type: Boolean },
    hidePaginationInfo: { type: Boolean },
    buttonsPagination: { type: Boolean },
    showShadow: { type: Boolean },
    footerClassName: { default: "" },
    mobileFooterClasses: { default: "" },
    desktopFooterClasses: { default: "" },
    rowsPerPage: {},
    rowsItems: {},
    rowsPerPageMessage: {},
    rowsOfPageSeparatorMessage: {},
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    currentPaginationNumber: {},
    maxPaginationNumber: {},
    isFirstPage: { type: Boolean },
    isLastPage: { type: Boolean }
  },
  emits: ["update:rowsPerPage", "nextPage", "prevPage", "updatePage"],
  setup(e, { emit: o }) {
    const t = e, a = o;
    f(() => ({
      rowsPerPage: t.rowsPerPage,
      rowsItems: t.rowsItems,
      rowsPerPageMessage: t.rowsPerPageMessage,
      updateRowsPerPage: (n) => a("update:rowsPerPage", n)
    })), f(() => ({
      currentPageFirstIndex: t.currentPageFirstIndex,
      currentPageLastIndex: t.currentPageLastIndex,
      totalItemsLength: t.totalItemsLength,
      rowsOfPageSeparatorMessage: t.rowsOfPageSeparatorMessage
    })), f(() => ({
      isFirstPage: t.isFirstPage,
      isLastPage: t.isLastPage,
      currentPaginationNumber: t.currentPaginationNumber,
      maxPaginationNumber: t.maxPaginationNumber,
      buttonsPagination: t.buttonsPagination,
      nextPage: () => a("nextPage"),
      prevPage: () => a("prevPage"),
      updatePage: (n) => a("updatePage", n)
    }));
    const s = f(() => ({
      // 原始 props (扁平化，方便直接使用)
      ...t,
      // 分頁資訊 (結構化)
      paginationInfo: {
        currentPageFirstIndex: t.currentPageFirstIndex,
        currentPageLastIndex: t.currentPageLastIndex,
        totalItemsLength: t.totalItemsLength,
        rowsOfPageSeparatorMessage: t.rowsOfPageSeparatorMessage
      },
      // 分頁操作 (結構化)
      pagination: {
        isFirstPage: t.isFirstPage,
        isLastPage: t.isLastPage,
        currentPaginationNumber: t.currentPaginationNumber,
        maxPaginationNumber: t.maxPaginationNumber,
        buttonsPagination: t.buttonsPagination,
        nextPage: () => a("nextPage"),
        prevPage: () => a("prevPage"),
        updatePage: (n) => a("updatePage", n)
      },
      // 每頁行數 (結構化)
      rowsPerPage: {
        current: t.rowsPerPage,
        options: t.rowsItems,
        message: t.rowsPerPageMessage,
        update: (n) => a("update:rowsPerPage", n)
      },
      // 便利方法 (扁平化，向後相容)
      updateRowsPerPage: (n) => a("update:rowsPerPage", n),
      nextPage: () => a("nextPage"),
      prevPage: () => a("prevPage"),
      updatePage: (n) => a("updatePage", n)
    }));
    return (n, u) => (k(), x("div", {
      class: S(["vdt-footer", [
        "bg-white border border-gray-200 border-t-0",
        { "shadow-sm": n.showShadow },
        n.footerClassName
      ]])
    }, [
      N(n.$slots, "footer-mobile", W(ne(s.value)), () => [
        w("div", {
          class: S(["vdt-footer-mobile sm:hidden px-4 py-3 w-full", n.mobileFooterClasses])
        }, [
          H(pt, {
            "is-first-page": n.isFirstPage,
            "is-last-page": n.isLastPage,
            onClickNextPage: u[0] || (u[0] = () => a("nextPage")),
            onClickPrevPage: u[1] || (u[1] = () => a("prevPage")),
            class: "sm:hidden flex items-center justify-between w-full"
          }, {
            buttonsPagination: re(() => [
              w("div", Eo, [
                w("span", Oo, V(n.currentPaginationNumber) + " / " + V(n.maxPaginationNumber), 1)
              ])
            ]),
            _: 1
          }, 8, ["is-first-page", "is-last-page"])
        ], 2)
      ]),
      N(n.$slots, "footer-desktop", W(ne(s.value)), () => [
        w("div", {
          class: S(["vdt-footer-desktop hidden sm:flex items-center justify-between px-4 py-3 w-full", n.desktopFooterClasses])
        }, [
          w("div", Do, [
            N(n.$slots, "rows-per-page", q(s.value.rowsPerPage, { rawProps: s.value }), () => [
              n.hideRowsPerPage ? D("", !0) : (k(), x("div", Ho, [
                H(No, {
                  "model-value": n.rowsPerPage,
                  "rows-items": n.rowsItems,
                  message: n.rowsPerPageMessage,
                  "onUpdate:modelValue": u[2] || (u[2] = (r) => a("update:rowsPerPage", r))
                }, null, 8, ["model-value", "rows-items", "message"])
              ]))
            ])
          ]),
          w("div", jo, [
            N(n.$slots, "pagination-info", q(s.value.paginationInfo, { rawProps: s.value }), () => [
              n.hidePaginationInfo ? D("", !0) : (k(), x("div", zo, [
                H(Fo, {
                  "current-page-first-index": n.currentPageFirstIndex,
                  "current-page-last-index": n.currentPageLastIndex,
                  "total-items-length": n.totalItemsLength,
                  "rows-of-page-separator-message": n.rowsOfPageSeparatorMessage
                }, null, 8, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])
              ]))
            ])
          ]),
          w("div", Wo, [
            N(n.$slots, "pagination", q(s.value.pagination, { rawProps: s.value }), () => [
              H(pt, {
                "is-first-page": n.isFirstPage,
                "is-last-page": n.isLastPage,
                onClickNextPage: u[4] || (u[4] = () => a("nextPage")),
                onClickPrevPage: u[5] || (u[5] = () => a("prevPage"))
              }, ve({ _: 2 }, [
                n.buttonsPagination ? {
                  name: "buttonsPagination",
                  fn: re(() => [
                    H(To, {
                      "current-pagination-number": n.currentPaginationNumber,
                      "max-pagination-number": n.maxPaginationNumber,
                      onUpdatePage: u[3] || (u[3] = (r) => a("updatePage", r))
                    }, null, 8, ["current-pagination-number", "max-pagination-number"])
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["is-first-page", "is-last-page"])
            ])
          ])
        ], 2)
      ])
    ], 2));
  }
}), Vo = ["id"], Ko = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50"
}, Uo = { class: "relative z-10" }, Jo = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-gray-500"
}, Go = {
  key: 0,
  class: "vdt-footer-section"
}, Pt = /* @__PURE__ */ E({
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
    theme: { default: () => "indigo" },
    alternating: { type: Boolean, default: !0 },
    noHover: { type: Boolean, default: !1 },
    borderCell: { type: Boolean, default: !1 },
    borderRow: { type: Boolean, default: !0 },
    checkboxColumnWidth: { default: null },
    expandColumnWidth: { default: 36 },
    indexColumnWidth: { default: 60 },
    showIndex: { type: Boolean, default: !1 },
    showIndexSymbol: { default: "#" },
    fixedExpand: { type: Boolean, default: !1 },
    fixedHeader: { type: Boolean, default: !1 },
    fixedCheckbox: { type: Boolean, default: !1 },
    fixedIndex: { type: Boolean, default: !1 },
    wrapperClassName: { default: "" },
    containerClassName: { default: "" },
    tableClassName: { default: "" },
    headerClassName: { default: "" },
    bodyClassName: { default: "" },
    headerItemClassName: { type: [Function, String], default: "" },
    bodyRowClassName: { type: [Function, String], default: "" },
    bodyExpandRowClassName: { type: [Function, String], default: "" },
    bodyItemClassName: { type: [Function, String], default: "" },
    footerClassName: { default: "" },
    mobileFooterClasses: { default: "" },
    desktopFooterClasses: { default: "" },
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
    expandTransition: { type: Boolean, default: void 0 },
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
  setup(e, { expose: o, emit: t }) {
    const a = e, {
      checkboxColumnWidth: s,
      expandColumnWidth: n,
      indexColumnWidth: u,
      rowsItems: r,
      showIndexSymbol: l,
      currentPage: i,
      filterOptions: c,
      headers: v,
      itemsSelected: p,
      loading: d,
      items: m,
      rowsPerPage: P,
      searchField: $,
      searchValue: F,
      serverItemsLength: A,
      showIndex: T,
      sortBy: ee,
      sortType: j,
      serverOptions: ue,
      multiSort: te,
      mustSort: ke,
      clickEventType: ye,
      clickRowToExpand: be,
      clickRowToSelect: G,
      fixedExpand: Pe,
      fixedCheckbox: B,
      fixedIndex: z,
      batchSelectionThreshold: O,
      expandColumn: K
    } = Jt(a);
    La(a.theme);
    const h = vt(), b = f(() => !!h.expand), C = f(() => !!h.body), L = f(() => {
      const g = {};
      return ["rows-per-page", "pagination-info", "pagination"].forEach((I) => {
        h[I] && (g[I] = h[I]);
      }), Object.keys(h).forEach((I) => {
        I.startsWith("footer-") && I !== "footer-content" && (g[I] = h[I]);
      }), g;
    }), ce = f(
      () => typeof a.expandTransition < "u" ? a.expandTransition : b.value
    ), ae = Z(null), Q = Z(null);
    Gt("dataTable", ae);
    const X = t, xe = f(() => p.value !== null), oe = f(() => ue.value !== null), Fe = f(() => ({
      // 分頁相關
      currentPaginationNumber: se.value,
      maxPaginationNumber: Ce.value,
      isFirstPage: Ie.value,
      isLastPage: Se.value,
      // 資料相關
      currentPageFirstIndex: Oe.value,
      currentPageLastIndex: De.value,
      totalItemsLength: we.value,
      // 每頁行數相關
      rowsPerPage: he.value,
      rowsItems: Te.value,
      rowsPerPageMessage: a.rowsPerPageMessage,
      rowsOfPageSeparatorMessage: a.rowsOfPageSeparatorMessage,
      // 配置相關
      hideRowsPerPage: a.hideRowsPerPage,
      hidePaginationInfo: a.hidePaginationInfo,
      buttonsPagination: a.buttonsPagination,
      // 方法
      nextPage: Ne,
      prevPage: $e,
      updatePage: me,
      updateRowsPerPage: Ee,
      // 原始資料（如果需要的話）
      items: le.value,
      headers: ge.value,
      // 選擇相關
      selectedItems: tt.value,
      multipleSelectStatus: ot.value,
      // 主題
      theme: a.theme
    })), xt = f(() => ({
      hideFooter: !1,
      // 已在外層處理
      hideRowsPerPage: a.hideRowsPerPage,
      hidePaginationInfo: a.hidePaginationInfo,
      buttonsPagination: a.buttonsPagination,
      showShadow: ut.value,
      footerClassName: a.footerClassName,
      mobileFooterClasses: a.mobileFooterClasses,
      desktopFooterClasses: a.desktopFooterClasses,
      rowsPerPage: he.value,
      rowsItems: Te.value,
      rowsPerPageMessage: a.rowsPerPageMessage,
      rowsOfPageSeparatorMessage: a.rowsOfPageSeparatorMessage,
      currentPageFirstIndex: Oe.value,
      currentPageLastIndex: De.value,
      totalItemsLength: we.value,
      currentPaginationNumber: se.value,
      maxPaginationNumber: Ce.value,
      isFirstPage: Ie.value,
      isLastPage: Se.value
    })), {
      serverOptionsComputed: Ae,
      updateServerOptionsPage: wt,
      updateServerOptionsSort: Ct,
      updateServerOptionsRowsPerPage: St
    } = ka(
      ue,
      te,
      X
    ), {
      clientSortOptions: Ye,
      headerColumns: _e,
      headersForRender: ge,
      updateSortField: It,
      isMultiSorting: Nt,
      getMultiSortNumber: $t
    } = ua(
      l,
      s,
      n,
      B,
      Pe,
      z,
      v,
      b,
      u,
      xe,
      oe,
      ke,
      Ae,
      T,
      ee,
      j,
      te,
      K,
      Ct,
      X
    ), {
      rowsItemsComputed: Te,
      rowsPerPageRef: he,
      updateRowsPerPage: Ee
    } = va(
      oe,
      r,
      ue,
      P
    ), {
      totalItems: et,
      selectItemsComputed: tt,
      totalItemsLength: we,
      toggleSelectAll: Ft,
      toggleSelectItem: at,
      isProcessing: Bt,
      processProgress: Rt
    } = Sa(
      Ye,
      c,
      oe,
      m,
      p,
      $,
      F,
      A,
      te,
      O,
      a.disabledRows,
      X
    ), {
      currentPaginationNumber: se,
      maxPaginationNumber: Ce,
      isLastPage: Se,
      isFirstPage: Ie,
      nextPage: Ne,
      prevPage: $e,
      updatePage: me,
      updateCurrentPaginationNumber: Mt
    } = ma(
      i,
      oe,
      d,
      we,
      he,
      ue,
      wt
    ), {
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      multipleSelectStatus: ot,
      pageItems: le
    } = pa(
      se,
      xe,
      oe,
      m,
      he,
      tt,
      T,
      et,
      we,
      a.disabledRows
    ), Be = f(() => se.value === 0 ? 0 : (se.value - 1) * he.value), {
      expandingItemIndexList: He,
      updateExpandingItemIndexList: st,
      clearExpandingItemIndexList: lt
    } = ra(
      le,
      Be,
      X
    ), {
      fixedHeaders: je,
      lastLeftFixedColumn: nt,
      firstRightFixedColumn: rt,
      fixedColumnsInfos: it,
      showShadow: ut
    } = ia(
      ge,
      Q
    ), Lt = (g) => {
      const I = g.width ?? (je.value.length ? 100 : null);
      if (I) return `width: ${I}px; min-width: ${I}px;`;
    }, ct = (g, I = "th") => {
      if (!je.value.length) return;
      const R = it.value.find((M) => M.value === g);
      if (R)
        return `
            position: sticky;
            ${R.position === "left" ? `left: ${R.distance}px;` : `right: ${R.distance}px;`}
            z-index: ${I === "th" ? 3 : 1};
        `;
    }, ze = Z(!1);
    Zt(() => {
      Q.value && (ze.value = Q.value.scrollWidth > Q.value.clientWidth);
    });
    const At = f(() => (g) => {
      if (!je.value.length) return [];
      const I = [];
      return it.value.find((M) => M.value === g) && (I.push("fixed-column"), a.borderRow && ze.value && I.push("shadow-[inset_0_1px_0_#e5e7eb]"), g === nt.value ? I.push("fixed-left-shadow") : g === rt.value && I.push("fixed-right-shadow")), I;
    }), Tt = (g) => {
      g.sortable && g.sortType && It(g.value, g.sortType);
    }, We = (g) => typeof a.disabledRows == "function" ? a.disabledRows(g) : !1, Et = f(() => le.value.every((g) => a.disabledRows(g))), Ot = (g) => {
      We(g) || at(g);
    }, {
      handleRowClick: Dt,
      handleRowDoubleClick: Ht,
      handleRowContextMenu: jt
    } = na(
      ye,
      xe,
      T,
      We,
      be,
      G,
      st,
      at,
      X
    );
    return de(d, (g, I) => {
      Ae.value && g === !1 && I === !0 && (Mt(Ae.value.page), lt());
    }), de(he, (g) => {
      oe.value ? St(g) : me(1);
    }), de([F, c], () => {
      oe.value || me(1);
    }), de([se, Ye, $, F, c], () => {
      lt();
    }, { deep: !0 }), de(le, (g) => {
      X("updatePageItems", g);
    }, { deep: !0 }), de(et, (g) => {
      X("updateTotalItems", g);
    }, { deep: !0 }), Ge(() => {
      if (Q.value) {
        const g = Q.value, I = () => {
          ze.value = g.scrollWidth > g.clientWidth;
        };
        I(), g.addEventListener("scroll", I), window.addEventListener("resize", I);
        const R = new MutationObserver(I);
        R.observe(g, {
          childList: !0,
          subtree: !0,
          attributes: !0
        }), mt(() => {
          g.removeEventListener("scroll", I), window.addEventListener("resize", I), R.disconnect();
        });
      }
    }), o({
      currentPageFirstIndex: Oe,
      currentPageLastIndex: De,
      clientItemsLength: we,
      maxPaginationNumber: Ce,
      currentPaginationNumber: se,
      isLastPage: Se,
      isFirstPage: Ie,
      nextPage: Ne,
      prevPage: $e,
      updatePage: me,
      rowsPerPageOptions: Te,
      rowsPerPageActiveOption: he,
      updateRowsPerPageActiveOption: Ee
    }), (g, I) => (k(), x("div", {
      ref_key: "tableWrapper",
      ref: ae,
      class: S(["vdt-table-wrapper relative w-full", [g.wrapperClassName]])
    }, [
      w("div", {
        ref_key: "tableContainer",
        ref: Q,
        class: S(["vdt-table-container relative overflow-auto border scroll-smooth border-gray-200 min-h-[180px]", [{ "shadow-xs show-shadow": y(ut) }, g.containerClassName]])
      }, [
        w("table", {
          id: g.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-white", [g.tableClassName]])
        }, [
          w("colgroup", null, [
            (k(!0), x(ie, null, J(y(ge), (R, M) => (k(), x("col", {
              key: M,
              style: Me(Lt(R))
            }, null, 4))), 128))
          ]),
          y(h)["customize-headers"] ? N(g.$slots, "customize-headers", { key: 0 }) : D("", !0),
          H(uo, q({
            headers: y(ge),
            hideHeader: g.hideHeader,
            fixedHeader: g.fixedHeader,
            headerClassName: g.headerClassName,
            borderCell: g.borderCell,
            lastLeftFixedColumn: y(nt),
            firstRightFixedColumn: y(rt),
            headerItemClassName: g.headerItemClassName,
            areAllVisibleRowsDisabled: Et.value,
            multipleSelectStatus: y(ot),
            multiSort: y(te)
          }, {
            "is-multi-sorting": y(Nt),
            "get-multi-sort-number": y($t),
            "get-fixed-distance": ct,
            onHeaderClick: Tt,
            onToggleSelectAll: y(Ft)
          }), ve({ _: 2 }, [
            J(g.$slots, (R, M) => ({
              name: M,
              fn: re((U) => [
                N(g.$slots, M, W(ne(U)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          C.value ? N(g.$slots, "body", W(q({ key: 1 }, y(le)))) : y(_e).length ? (k(), x("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [g.bodyClassName]])
          }, [
            N(g.$slots, "body-prepend", W(ne({
              items: y(le),
              pagination: { isFirstPage: y(Ie), isLastPage: y(Se), currentPaginationNumber: y(se), maxPaginationNumber: y(Ce), nextPage: y(Ne), prevPage: y($e) },
              headers: y(ge)
            }))),
            (k(!0), x(ie, null, J(y(le), (R, M) => (k(), x(ie, {
              key: R.key || M
            }, [
              H(go, {
                item: R,
                index: M,
                columns: y(_e),
                alternating: g.alternating,
                "no-hover": g.noHover,
                "border-cell": g.borderCell,
                "border-row": g.borderRow,
                "body-row-className": g.bodyRowClassName,
                "body-item-class-name": g.bodyItemClassName,
                "is-expanded": y(He).includes(M + Be.value),
                "is-disabled": We(R),
                "expand-column": y(K),
                "get-fixed-distance": ct,
                "get-fixed-column-classes": At.value,
                onClick: (U) => y(Dt)(U, R, M),
                onDblclick: (U) => y(Ht)(U, R, M),
                onContextmenu: (U) => y(jt)(U, R),
                onToggleExpand: (U) => y(st)(M, R, U),
                onToggleSelect: (U) => Ot(R)
              }, ve({ _: 2 }, [
                J(g.$slots, (U, dt) => ({
                  name: dt,
                  fn: re((zt) => [
                    N(g.$slots, dt, q({ ref_for: !0 }, zt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "border-row", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "get-fixed-column-classes", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              ce.value || y(He).includes(M + Be.value) ? (k(), _(yo, {
                key: 0,
                item: R,
                index: M,
                "columns-count": y(ge).length,
                loading: R.expandLoading,
                "is-expanded": y(He).includes(M + Be.value),
                "body-expand-row-className": g.bodyExpandRowClassName
              }, {
                default: re(() => [
                  N(g.$slots, "expand", q({ ref_for: !0 }, R))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : D("", !0)
            ], 64))), 128)),
            N(g.$slots, "body-append", W(ne({
              items: y(le),
              pagination: { isFirstPage: y(Ie), isLastPage: y(Se), currentPaginationNumber: y(se), maxPaginationNumber: y(Ce), nextPage: y(Ne), prevPage: y($e), updatePage: y(me) },
              headers: y(ge)
            })))
          ], 2)) : D("", !0)
        ], 10, Vo),
        y(d) ? (k(), x("div", Ko, [
          w("div", Uo, [
            N(g.$slots, "loading", {}, () => [
              H(_t)
            ])
          ])
        ])) : D("", !0),
        !y(le).length && !y(d) ? (k(), x("div", Jo, [
          N(g.$slots, "empty-message", {}, () => [
            Le(V(g.emptyMessage), 1)
          ])
        ])) : D("", !0)
      ], 2),
      g.hideFooter ? D("", !0) : (k(), x("div", Go, [
        g.$slots["footer-content"] ? N(g.$slots, "footer-content", W(q({ key: 0 }, Fe.value))) : (k(), _(qo, q({ key: 1 }, xt.value, {
          "onUpdate:rowsPerPage": y(Ee),
          onNextPage: y(Ne),
          onPrevPage: y($e),
          onUpdatePage: y(me)
        }), ve({ _: 2 }, [
          J(L.value, (R, M) => ({
            name: M,
            fn: re((U) => [
              N(g.$slots, M, W(ne(U)))
            ])
          }))
        ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]))
      ])),
      Ve(H(la, { progress: y(Rt) }, null, 8, ["progress"]), [
        [Ke, y(Bt)]
      ])
    ], 2));
  }
}), Zo = (e) => {
  e.component("DataTable", Pt);
};
Pt.install = Zo;
export {
  Yo as createFilter,
  Pt as default,
  Zo as install
};
