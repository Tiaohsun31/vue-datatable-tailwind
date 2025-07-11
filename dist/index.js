import { createElementBlock as x, openBlock as b, Fragment as ie, renderList as Q, createElementVNode as w, normalizeClass as S, defineComponent as A, normalizeStyle as Te, toDisplayString as W, ref as K, computed as f, onMounted as Ae, onUnmounted as pt, watch as Y, createVNode as D, withModifiers as Ge, withDirectives as Qe, vShow as Je, createBlock as _, useSlots as kt, renderSlot as M, createCommentVNode as E, normalizeProps as q, guardReactiveProps as le, unref as k, createSlots as ke, withCtx as re, mergeProps as O, createTextVNode as Oe, inject as Ut, onBeforeUnmount as bt, Transition as Kt, nextTick as Qt, toRefs as Jt, provide as Gt, watchEffect as Zt } from "vue";
const ve = (s, a) => {
  const e = s.__vccOpts || s;
  for (const [t, o] of a)
    e[t] = o;
  return e;
}, Xt = {}, Yt = { class: "inline-flex relative w-[60px] h-[60px]" };
function _t(s, a) {
  return b(), x("div", Yt, [
    (b(), x(ie, null, Q(4, (e) => w("div", {
      key: e,
      class: S(["box-border absolute w-4/5 h-4/5 m-2 border-[8px] border-transparent rounded-full animate-ring border-t-vdt-primary-500", [`animate-delay-${(e - 1) * 150}`]])
    }, null, 2)), 64))
  ]);
}
const ea = /* @__PURE__ */ ve(Xt, [["render", _t], ["__scopeId", "data-v-c23c712b"]]), ta = { class: "absolute inset-0 bg-black/50 flex items-center justify-center z-50" }, aa = { class: "bg-white p-6 rounded-lg shadow-xl space-y-4" }, sa = { class: "w-64" }, oa = { class: "h-2 bg-gray-200 rounded-sm" }, na = { class: "text-center text-sm text-gray-600" }, la = /* @__PURE__ */ A({
  __name: "SelectionLoadingOverlay",
  props: {
    progress: {}
  },
  setup(s) {
    return (a, e) => (b(), x("div", ta, [
      w("div", aa, [
        e[0] || (e[0] = w("div", { class: "text-center text-lg font-medium" }, " Processing data selection... ", -1)),
        w("div", sa, [
          w("div", oa, [
            w("div", {
              class: "h-2 rounded-sm transition-all duration-300 ease-out bg-vdt-primary-500",
              style: Te({ width: `${a.progress}%` })
            }, null, 4)
          ])
        ]),
        w("div", na, W(Math.round(a.progress)) + "% ", 1)
      ])
    ]));
  }
});
function ra(s, a, e, t, o, n, r, i, l) {
  const u = (d, v) => {
    const P = { ...d };
    return a.value && (delete P.checkbox, P.isSelected = d.checkbox), e.value && (delete P.index, P.indexInCurrentPage = v + 1), P;
  };
  return {
    handleRowClick: (d, v, P) => {
      if (!d.target.closest(".checkbox, .expand-button") && (o.value && r(P, v, d), n.value && !t(v) && i(v), s.value === "single")) {
        const $ = u(v, P);
        l("clickRow", $, d);
      }
    },
    handleRowDoubleClick: (d, v, P) => {
      if (s.value === "double") {
        const $ = u(v, P);
        l("clickRow", $, d);
      }
    },
    handleRowContextMenu: (d, v) => {
      const P = u(v, -1);
      l("contextmenuRow", P, d);
    }
  };
}
function ia(s, a, e) {
  const t = K([]);
  return {
    expandingItemIndexList: t,
    // 展開項的索引列表
    updateExpandingItemIndexList: (r, i, l) => {
      l.stopPropagation();
      const u = t.value.indexOf(r);
      if (u !== -1)
        t.value.splice(u, 1);
      else {
        const c = s.value.findIndex((m) => JSON.stringify(m) === JSON.stringify(i));
        e("expandRow", a.value + c, i), t.value.push(a.value + c);
      }
    },
    // 更新展開狀態的方法
    clearExpandingItemIndexList: () => {
      t.value = [];
    }
    // 清空展開列表的方法
  };
}
function ua(s, a) {
  const e = f(() => s.value.filter((c) => c.fixed)), t = f(() => e.value.filter((c) => !c.fixedPosition || c.fixedPosition === "left")), o = f(() => e.value.filter((c) => c.fixedPosition === "right")), n = f(() => t.value.length ? t.value[t.value.length - 1].value : ""), r = f(() => o.value.length ? o.value[0].value : ""), i = f(() => {
    if (!e.value.length) return [];
    const c = [];
    if (t.value.length) {
      const m = t.value.map((g) => g.width ?? 100);
      t.value.forEach((g, d) => {
        c.push({
          value: g.value,
          // 列標籤
          fixed: !0,
          // 是否固定
          position: "left",
          // 固定位置
          width: g.width ?? 100,
          // 列寬度
          // 計算距離左側的距離
          distance: d === 0 ? 0 : m.reduce((v, P, $) => $ < d ? v + P : v, 0)
        });
      });
    }
    if (o.value.length) {
      const m = o.value.map((g) => g.width ?? 100);
      o.value.forEach((g, d) => {
        c.push({
          value: g.value,
          fixed: !0,
          position: "right",
          width: g.width ?? 100,
          distance: d === o.value.length - 1 ? 0 : m.reduce((v, P, $) => $ > d ? v + P : v, 0)
        });
      });
    }
    return c;
  }), l = K(!1);
  let u = null;
  return Ae(() => {
    const c = a.value;
    if (c) {
      const m = () => {
        l.value = c.scrollLeft > 0;
      };
      m(), c.addEventListener("scroll", m), u = () => {
        c.removeEventListener("scroll", m);
      };
    }
  }), pt(() => {
    u && (u(), u = null);
  }), {
    fixedHeaders: e,
    leftFixedHeaders: t,
    rightFixedHeaders: o,
    lastLeftFixedColumn: n,
    firstRightFixedColumn: r,
    fixedColumnsInfos: i,
    showShadow: l
  };
}
function ca(s, a, e, t, o, n, r, i, l, u, c, m, g, d, v, P, $, F, L, T) {
  const ee = f(() => r.value.length ? {
    hasFixedColumns: r.value.some((N) => N.fixed),
    fixedHeaders: r.value.filter((N) => N.fixed),
    unFixedHeaders: r.value.filter((N) => !N.fixed)
  } : { hasFixedColumns: !1, fixedHeaders: [], unFixedHeaders: [] }), H = K(
    da(v.value, P.value, $.value)
  ), { determineHeaderSortState: ue } = fa(c, g, $, H), te = f(() => {
    const N = r.value.map((p) => ({
      ...p,
      sortType: p.sortable ? ue(p.value) : void 0
    })), j = N.filter(
      (p) => p.fixed && (!p.fixedPosition || p.fixedPosition === "left")
    ), ae = N.filter((p) => !p.fixed), ce = N.filter(
      (p) => p.fixed && p.fixedPosition === "right"
    );
    return [
      ...Object.values(be.value).filter(Boolean),
      ...j,
      ...ae,
      ...ce
    ];
  }), be = f(() => ({
    checkbox: u.value && {
      text: "checkbox",
      value: "checkbox",
      fixed: t.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: a.value ?? 36
    },
    index: d.value && {
      text: s.value,
      value: "index",
      fixed: n.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: l.value
    },
    expand: i.value && !F.value && {
      text: "",
      value: "expand",
      fixed: o.value || ee.value.hasFixedColumns,
      fixedPosition: "left",
      width: e.value
    }
  })), ye = f(
    () => te.value.map((N) => N.value)
  ), Pe = (N, j) => {
    const ae = j === "none" ? "asc" : j === "asc" ? "desc" : m.value ? "asc" : null;
    if (c.value) {
      L(N, ae);
      return;
    }
    const ce = $.value ? ha(N, ae, H.value) : ga(N, ae);
    H.value = ce, T("updateSort", { sortType: ae, sortBy: N });
  }, J = f(() => (N) => {
    const j = c.value ? g.value?.sortBy : H.value?.sortBy;
    return Array.isArray(j) && j.includes(N);
  }), xe = f(() => (N) => {
    const j = c.value ? g.value?.sortBy : H.value?.sortBy;
    return Array.isArray(j) ? j.indexOf(N) + 1 : !1;
  });
  return {
    clientSortOptions: H,
    headerColumns: ye,
    headersForRender: te,
    updateSortField: Pe,
    isMultiSorting: J,
    getMultiSortNumber: xe
  };
}
function da(s, a, e) {
  return e && Array.isArray(s) && Array.isArray(a) ? {
    sortBy: s,
    sortDesc: a.map((t) => t === "desc")
  } : typeof s == "string" && s !== "" ? {
    sortBy: s,
    sortDesc: a === "desc"
  } : null;
}
const ha = (s, a, e) => {
  if (!e?.sortBy || !Array.isArray(e.sortBy) || !Array.isArray(e.sortDesc))
    return a === null ? null : {
      sortBy: [s],
      sortDesc: [a === "desc"]
    };
  const t = e.sortBy.indexOf(s), o = [...e.sortBy], n = [...e.sortDesc];
  return t === -1 && a !== null ? (o.push(s), n.push(a === "desc")) : a === null ? (o.splice(t, 1), n.splice(t, 1)) : n[t] = a === "desc", { sortBy: o, sortDesc: n };
}, ga = (s, a) => a === null ? null : {
  sortBy: s,
  sortDesc: a === "desc"
};
function fa(s, a, e, t) {
  const o = (i) => !s.value || !a.value ? n(i) : r(i), n = (i) => {
    if (!t.value) return "none";
    const { sortBy: l, sortDesc: u } = t.value;
    if (e.value && Array.isArray(l) && Array.isArray(u)) {
      const c = l.indexOf(i);
      return c !== -1 ? u[c] ? "desc" : "asc" : "none";
    }
    return i === l ? u ? "desc" : "asc" : "none";
  }, r = (i) => {
    const { sortBy: l, sortType: u } = a.value;
    if (e.value && Array.isArray(l) && Array.isArray(u)) {
      const c = l.indexOf(i);
      return c !== -1 ? u[c] : "none";
    }
    return i === l && u ? u : "none";
  };
  return {
    determineHeaderSortState: o
  };
}
class ma {
  itemKeyCache = /* @__PURE__ */ new WeakMap();
  pageCache = /* @__PURE__ */ new Map();
  getItemKey(a) {
    let e = this.itemKeyCache.get(a);
    if (!e) {
      const { checkbox: t, index: o, ...n } = a;
      e = Object.entries(n).sort(([r], [i]) => r.localeCompare(i)).map(([r, i]) => `${r}:${i}`).join("|"), this.itemKeyCache.set(a, e);
    }
    return e;
  }
  clearPageCache() {
    this.pageCache.clear();
  }
}
function va(s, a, e, t, o, n, r, i, l, u) {
  const c = new ma(), m = f(
    () => (s.value - 1) * o.value + 1
  ), g = f(() => e.value ? Math.min(
    l.value,
    s.value * o.value
  ) : Math.min(
    i.value.length,
    s.value * o.value
  )), d = f(() => e.value ? t.value : i.value.slice(
    m.value - 1,
    g.value
  )), v = f(() => r.value ? d.value.map((F, L) => ({
    index: m.value + L,
    ...F
  })) : d.value), P = f(() => {
    if (n.value.length === 0)
      return "noneSelected";
    const F = u ? i.value.filter((T) => !u(T)) : i.value;
    return n.value.length === F.length && n.value.every(
      (ee) => F.some(
        (H) => c.getItemKey(ee) === c.getItemKey(H)
      )
    ) ? "allSelected" : "partSelected";
  }), $ = f(() => {
    if (!a.value)
      return v.value;
    switch (P.value) {
      case "allSelected":
        return v.value.map((F) => ({
          checkbox: !u || !u(F),
          // 考慮禁用狀態
          ...F
        }));
      case "noneSelected":
        return v.value.map((F) => ({
          checkbox: !1,
          ...F
        }));
      default:
        return v.value.map((F) => ({
          checkbox: n.value.some(
            (T) => c.getItemKey(F) === c.getItemKey(T)
          ) && (!u || !u(F)),
          ...F
        }));
    }
  });
  return {
    currentPageFirstIndex: m,
    currentPageLastIndex: g,
    multipleSelectStatus: P,
    pageItems: $
  };
}
function pa(s, a, e, t, o, n, r) {
  const i = K(n.value ? n.value.page : s.value), l = f(() => Math.ceil(t.value / o.value)), u = f(() => l.value === 0 || i.value === l.value), c = f(() => i.value === 1);
  return {
    currentPaginationNumber: i,
    maxPaginationNumber: l,
    isLastPage: u,
    isFirstPage: c,
    nextPage: () => {
      if (t.value !== 0 && !u.value && !e.value)
        if (a.value) {
          const P = i.value + 1;
          r(P);
        } else
          i.value += 1;
    },
    prevPage: () => {
      if (t.value !== 0 && !c.value && !e.value)
        if (a.value) {
          const P = i.value - 1;
          r(P);
        } else
          i.value -= 1;
    },
    updatePage: (P) => {
      e.value || (a.value ? r(P) : i.value = P);
    },
    updateCurrentPaginationNumber: (P) => {
      i.value = P;
    }
  };
}
function ka(s, a, e, t) {
  const o = f(() => !s.value && a.value.findIndex((i) => i === t.value) === -1 ? [t.value, ...a.value] : a.value), n = K(e.value?.rowsPerPage ?? t.value);
  return {
    rowsItemsComputed: o,
    // 計算後的每頁行數選項
    rowsPerPageRef: n,
    // 每頁行數
    updateRowsPerPage: (i) => {
      n.value = i;
    }
    // 更新每頁行數
  };
}
function ba(s, a, e) {
  const t = f({
    get: () => {
      if (s.value) {
        const { page: i, rowsPerPage: l, sortBy: u, sortType: c } = s.value;
        return { page: i, rowsPerPage: l, sortBy: u ?? null, sortType: c ?? null };
      }
      return null;
    },
    set: (i) => {
      e("update:serverOptions", i);
    }
  });
  return {
    serverOptionsComputed: t,
    updateServerOptionsPage: (i) => {
      t.value && (t.value = {
        ...t.value,
        page: i
      });
    },
    updateServerOptionsSort: (i, l) => {
      if (t.value)
        if (a.value && Array.isArray(t.value.sortBy) && Array.isArray(t.value.sortType)) {
          const u = t.value.sortBy.findIndex((c) => c === i);
          u === -1 && l !== null && (t.value.sortBy.push(i), t.value.sortType.push(l)), l === null ? (t.value.sortBy.splice(u, 1), t.value.sortType.splice(u, 1)) : t.value.sortType[u] = l;
        } else
          t.value = {
            ...t.value,
            sortBy: l !== null ? i : null,
            sortType: l
          };
    },
    updateServerOptionsRowsPerPage: (i) => {
      t.value && (t.value = {
        ...t.value,
        page: 1,
        rowsPerPage: i
      });
    }
  };
}
function ya(s) {
  return [">", ">=", "<", "<=", "between"].includes(s.comparison);
}
function Pa(s) {
  return s.comparison === "in";
}
function xa(s) {
  return typeof s.comparison == "function";
}
function wa(s) {
  return typeof s == "number" && !isNaN(s);
}
const to = {
  number(s, a, e) {
    return { field: s, comparison: a, criteria: e };
  },
  string(s, a, e) {
    return { field: s, comparison: a, criteria: e };
  },
  array(s, a) {
    return { field: s, comparison: "in", criteria: a };
  },
  custom(s, a, e) {
    return { field: s, comparison: a, criteria: e };
  }
};
function X(s, a) {
  if (s.includes(".")) {
    const e = s.split(".");
    let t = a;
    for (const o of e)
      if (t && typeof t == "object")
        t = t[o];
      else
        return "";
    return t ?? "";
  }
  return a[s] ?? "";
}
function Ca(s, a) {
  const e = X(s, a);
  return Array.isArray(e) ? e.join(",") : e;
}
const ht = 1e3, gt = /* @__PURE__ */ new WeakMap(), Le = (s) => {
  let a = gt.get(s);
  if (!a) {
    const { checkbox: e, index: t, ...o } = s;
    a = JSON.stringify(o), gt.set(s, a);
  }
  return a;
};
function Sa(s, a, e, t) {
  const o = K({
    selectedItems: /* @__PURE__ */ new Set(),
    itemsMap: /* @__PURE__ */ new Map(),
    selectionInProgress: !1,
    processedCount: 0,
    totalCount: 0,
    visualProgress: 0
  });
  Y(a, (c) => {
    if (c === null) {
      o.value.selectedItems.clear(), o.value.itemsMap.clear();
      return;
    }
    const m = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map();
    for (const d of c) {
      const v = Le(d);
      m.add(v), g.set(v, d);
    }
    o.value.selectedItems = m, o.value.itemsMap = g;
  }, { immediate: !0, deep: !0 });
  const n = async (c, m, g) => new Promise((d) => {
    requestAnimationFrame(() => {
      const v = new Set(o.value.selectedItems), P = new Map(o.value.itemsMap);
      for (let $ = 0; $ < c.length; $++) {
        const F = c[$], L = Le(F);
        m ? (v.add(L), P.set(L, F)) : v.delete(L), o.value.processedCount = g + $ + 1, o.value.visualProgress = o.value.processedCount / o.value.totalCount * 100;
      }
      o.value.selectedItems = v, o.value.itemsMap = P, d();
    });
  }), r = async (c) => {
    if (!o.value.selectionInProgress)
      try {
        if (o.value.selectionInProgress = !0, o.value.processedCount = 0, o.value.totalCount = s.value.length, o.value.visualProgress = 0, !c) {
          o.value.selectedItems.clear(), o.value.itemsMap.clear(), t("update:itemsSelected", []), o.value.visualProgress = 100;
          return;
        }
        const m = s.value;
        for (let g = 0; g < m.length; g += ht) {
          const v = m.slice(g, Math.min(g + ht, m.length)).filter((P) => !e(P));
          await n(v, c, g), await new Promise((P) => setTimeout(P, 0));
        }
        t("update:itemsSelected", l.value), c && t("selectAll");
      } finally {
        o.value.selectionInProgress = !1;
      }
  }, i = (c) => {
    const m = Le(c), g = { ...c };
    delete g.checkbox, delete g.index;
    const d = new Set(o.value.selectedItems), v = new Map(o.value.itemsMap);
    d.has(m) ? (d.delete(m), t("deselectRow", g)) : (d.add(m), v.set(m, g), t("selectRow", g)), o.value.selectedItems = d, o.value.itemsMap = v, t("update:itemsSelected", Array.from(v.values()).filter(($) => d.has(Le($))));
  }, l = f(() => o.value.selectedItems.size === 0 ? [] : Array.from(o.value.itemsMap.entries()).filter(([c]) => o.value.selectedItems.has(c)).map(([, c]) => c)), u = f(() => o.value.visualProgress);
  return {
    selectedItems: l,
    toggleSelectAll: r,
    toggleSelectItem: i,
    isProcessing: f(() => o.value.selectionInProgress),
    selectionProgress: u
  };
}
function Ia(s, a, e, t, o, n, r, i, l, u, c, m) {
  const g = /* @__PURE__ */ new WeakMap(), d = (y) => {
    let p = g.get(y);
    return p || (typeof n.value == "string" && n.value !== "" ? p = String(X(n.value, y)) : Array.isArray(n.value) ? p = n.value.map((C) => String(X(C, y))).join(" ") : p = Object.values(y).map(String).join(" "), g.set(y, p)), p;
  }, v = f(() => {
    if (!e.value && r.value !== "") {
      const y = new RegExp(r.value, "i");
      return t.value.filter((p) => y.test(d(p)));
    }
    return t.value;
  }), P = (y, p) => {
    const C = wa(y) ? y : parseFloat(String(y));
    if (isNaN(C)) return !1;
    if (p.comparison === "between" && Array.isArray(p.criteria)) {
      const [z, se] = p.criteria;
      return C >= z && C <= se;
    }
    const V = p.criteria;
    switch (p.comparison) {
      case ">":
        return C > V;
      case ">=":
        return C >= V;
      case "<":
        return C < V;
      case "<=":
        return C <= V;
      default:
        return !1;
    }
  }, $ = f(() => a.value?.length ? v.value.filter(
    (y) => a.value.every((p) => {
      const C = X(p.field, y);
      return xa(p) ? p.comparison(C, p.criteria) : ya(p) ? P(C, p) : Pa(p) ? p.criteria.includes(C) : p.comparison === "=" ? C === p.criteria : C !== p.criteria;
    })
  ) : v.value), F = (y, p, C) => y === p ? 0 : y == null ? 1 : p == null ? -1 : y < p ? C ? 1 : -1 : C ? -1 : 1, L = (y, p, C, V) => V < 0 ? y : L(y, p, C, V - 1).sort((z, se) => {
    if (!p.slice(0, V).every((G) => X(G, z) === X(G, se))) return 0;
    const Ne = p[V], Ee = X(Ne, z), Be = X(Ne, se);
    return F(Ee, Be, C[V]);
  }), T = f(() => {
    if (e.value) return t.value;
    if (!s.value) return $.value;
    const { sortBy: y, sortDesc: p } = s.value, C = [...$.value];
    return l.value && Array.isArray(y) && Array.isArray(p) ? y.length ? L(C, y, p, y.length - 1) : C : C.sort((V, z) => {
      const se = X(y, V), Fe = X(y, z);
      return F(se, Fe, p);
    });
  }), ee = f(() => e.value ? i.value : T.value.length), H = f(() => e.value ? !1 : (e.value ? i.value : t.value.length) >= u.value), {
    selectedItems: ue,
    toggleSelectAll: te,
    toggleSelectItem: be,
    isProcessing: ye,
    selectionProgress: Pe
  } = Sa(T, o, c, m), J = f({
    get: () => o.value ?? [],
    set: (y) => {
      m("update:itemsSelected", y);
    }
  }), xe = (y) => y.filter((p) => !c(p)), N = (y) => {
    J.value = y ? xe(T.value) : J.value = [], y && m("selectAll");
  }, j = (y) => {
    const p = y.checkbox;
    if (delete y.checkbox, delete y.index, p)
      J.value = J.value.filter(
        (C) => JSON.stringify(C) !== JSON.stringify(y)
      ), m("deselectRow", y);
    else {
      const C = J.value;
      C.unshift(y), J.value = C, m("selectRow", y);
    }
  };
  return {
    totalItems: T,
    selectItemsComputed: J,
    totalItemsLength: ee,
    toggleSelectAll: (y) => {
      if (!T.value.every((C) => c(C)))
        if (H.value) {
          m("updateSelectionStatus", !0);
          try {
            te(y), m("update:itemsSelected", y ? Array.from(ue.value) : []), y && m("selectAll");
          } finally {
            m("updateSelectionStatus", !1);
          }
        } else
          N(y);
    },
    toggleSelectItem: (y) => {
      c(y) || (H.value ? be(y) : j(y));
    },
    isProcessing: f(() => H.value && ye.value),
    processProgress: Pe
  };
}
const Ma = {}, $a = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function Fa(s, a) {
  return b(), x("svg", $a, a[0] || (a[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const Na = /* @__PURE__ */ ve(Ma, [["render", Fa]]), Ba = {}, Ra = {
  class: "h-[18px] w-[18px]",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};
function La(s, a) {
  return b(), x("svg", Ra, a[0] || (a[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M15 19l-7-7 7-7"
    }, null, -1)
  ]));
}
const Ta = /* @__PURE__ */ ve(Ba, [["render", La]]), Aa = {}, Oa = { class: "px-3 py-1.5" };
function Ea(s, a) {
  return b(), x("span", Oa, a[0] || (a[0] = [
    w("svg", {
      class: "w-4 h-4",
      fill: "currentColor",
      viewBox: "0 0 24 24"
    }, [
      w("path", { d: "M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" })
    ], -1)
  ]));
}
const Da = /* @__PURE__ */ ve(Aa, [["render", Ea]]), Ha = {}, ja = {
  class: "w-4 h-4 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Va(s, a) {
  return b(), x("svg", ja, a[0] || (a[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M9 5l7 7-7 7"
    }, null, -1)
  ]));
}
const za = /* @__PURE__ */ ve(Ha, [["render", Va]]), qa = {}, Wa = {
  class: "w-3 h-3 transition-transform",
  fill: "none",
  stroke: "currentColor",
  viewBox: "0 0 24 24"
};
function Ua(s, a) {
  return b(), x("svg", Wa, a[0] || (a[0] = [
    w("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      d: "M5 15l7-7 7 7"
    }, null, -1)
  ]));
}
const Ka = /* @__PURE__ */ ve(qa, [["render", Ua]]), Qa = /* @__PURE__ */ A({
  __name: "HeaderSortIcon",
  props: {
    sortType: {}
  },
  setup(s) {
    return (a, e) => (b(), x("span", {
      key: a.sortType,
      class: S(["inline-flex transition-opacity duration-200", [
        a.sortType === "none" ? "opacity-0" : "opacity-100",
        "group-hover:opacity-100"
      ]])
    }, [
      D(Ka, {
        class: S({ "transform rotate-180": a.sortType === "desc" })
      }, null, 8, ["class"])
    ], 2));
  }
}), Ja = ["checked", "disabled", "aria-checked"], Ga = {
  class: "h-4 w-4 text-white stroke-3",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Za = {
  class: "h-4 w-4 text-white",
  fill: "none",
  viewBox: "1 1 24 24",
  stroke: "currentColor"
}, Xa = /* @__PURE__ */ A({
  __name: "BaseCheckbox",
  props: {
    checked: { type: Boolean, default: !1 },
    partial: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(s) {
    const a = s, e = f(() => a.checked), t = f(() => a.partial);
    return (o, n) => (b(), x("div", {
      class: S(["relative inline-flex items-center justify-center h-5 w-5", [
        !o.disabled && "cursor-pointer group",
        o.disabled && "cursor-not-allowed opacity-50"
      ]]),
      onClick: n[0] || (n[0] = Ge((r) => !o.disabled && o.$emit("change"), ["stop", "prevent"]))
    }, [
      w("input", {
        type: "checkbox",
        class: "sr-only peer",
        checked: e.value,
        disabled: o.disabled,
        "aria-checked": e.value
      }, null, 8, Ja),
      w("div", {
        class: S(["h-4 w-4 rounded-sm transition-all duration-200 border", [
          // Base states
          e.value && !t.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !o.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          t.value && [
            "bg-vdt-primary-500 border-vdt-primary-500",
            !o.disabled && "group-hover:bg-vdt-primary-600 group-hover:border-vdt-primary-600"
          ],
          !e.value && !t.value && [
            "border-gray-300 bg-white",
            !o.disabled && "group-hover:border-vdt-primary-300"
          ],
          // Focus states
          !o.disabled && "peer-focus:ring-2 peer-focus:ring-offset-1 peer-focus:ring-vdt-primary-500/50"
        ]])
      }, [
        Qe((b(), x("svg", Ga, n[1] || (n[1] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M5 13l4 4L19 7"
          }, null, -1)
        ]), 512)), [
          [Je, e.value && !t.value]
        ]),
        Qe((b(), x("svg", Za, n[2] || (n[2] = [
          w("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2.5",
            d: "M20 12H4"
          }, null, -1)
        ]), 512)), [
          [Je, t.value]
        ])
      ], 2)
    ], 2));
  }
}), yt = /* @__PURE__ */ A({
  __name: "SingleSelectCheckBox",
  props: {
    checked: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["change"],
  setup(s, { emit: a }) {
    const e = a;
    return (t, o) => (b(), _(Xa, {
      checked: t.checked,
      disabled: t.disabled,
      partial: !1,
      onChange: o[0] || (o[0] = (n) => e("change"))
    }, null, 8, ["checked", "disabled"]));
  }
}), Ya = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = s, t = f(() => e.status === "allSelected"), o = f(() => e.status === "partSelected"), n = a;
    return (r, i) => (b(), _(yt, {
      checked: t.value,
      partial: o.value,
      disabled: s.disabled,
      onChange: i[0] || (i[0] = (l) => n("change", !t.value))
    }, null, 8, ["checked", "partial", "disabled"]));
  }
}), _a = {
  key: 1,
  class: "items-center gap-2"
}, es = {
  key: 1,
  class: "ml-1 text-xs px-1.5 py-0.5 bg-gray-200 rounded-full"
}, ts = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = a, t = kt(), o = (r) => [
      `header-${r.value}`,
      `header-${r.value.toLowerCase()}`,
      "header"
    ].find((l) => t[l]) || "header", n = (r) => {
      r.sortable && r.sortType && e("headerClick", r);
    };
    return (r, i) => (b(), x("th", {
      style: Te(s.fixedDistance),
      class: S(["vdt-thead-th px-4 py-3 font-semibold tracking-wider bg-gray-200 dark:bg-gray-700 group", [
        "px-4 py-3 font-semibold tracking-wider group",
        {
          "cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600": s.header.sortable,
          "shadow-[1px_0_0_0_rgba(0,0,0,0.1)]": s.header.value === s.lastLeftFixedColumn,
          "shadow-[-1px_0_0_0_rgba(0,0,0,0.1)]": s.header.value === s.firstRightFixedColumn
        },
        s.header.sortable && {
          "bg-gray-200": s.header.sortType === "none",
          "bg-gray-300": s.header.sortType && ["desc", "asc"].includes(s.header.sortType)
        },
        typeof s.headerItemClassName == "string" ? s.headerItemClassName : s.headerItemClassName(s.header, s.index + 1)
      ]]),
      onClick: i[1] || (i[1] = Ge((l) => n(s.header), ["stop"]))
    }, [
      s.header.text === "checkbox" ? (b(), _(Ya, {
        key: 0,
        disabled: s.areAllVisibleRowsDisabled,
        status: s.multipleSelectStatus,
        onChange: i[0] || (i[0] = (l) => r.$emit("toggleSelectAll", l))
      }, null, 8, ["disabled", "status"])) : (b(), x("div", _a, [
        M(r.$slots, o(s.header), q(le({ header: s.header, index: s.index, sortable: s.header.sortable })), () => [
          w("span", null, W(s.header.text), 1)
        ]),
        s.header.sortable ? (b(), _(k(Qa), {
          key: 0,
          "sort-type": s.header.sortType || "none"
        }, null, 8, ["sort-type"])) : E("", !0),
        s.multiSort && s.isMultiSorting(s.header.value) ? (b(), x("span", es, W(s.getMultiSortNumber(s.header.value)), 1)) : E("", !0)
      ]))
    ], 6));
  }
}), as = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = a, t = (n) => {
      e("headerClick", n);
    }, o = (n) => {
      e("toggleSelectAll", n);
    };
    return (n, r) => s.headers.length && !s.hideHeader ? (b(), x("thead", {
      key: 0,
      class: S(["vdt-thead", [
        "text-sm  text-vdt-content-muted uppercase text-nowrap text-left",
        { "sticky top-0 z-10": s.fixedHeader },
        s.headerClassName
      ]])
    }, [
      w("tr", {
        class: S(["vdt-thead-tr", [{ "divide-x divide-gray-300 dark:divide-gray-600": s.borderCell }]])
      }, [
        (b(!0), x(ie, null, Q(s.headers, (i, l) => (b(), _(ts, {
          key: l,
          header: i,
          index: l,
          "fixed-distance": s.getFixedDistance(i.value),
          "last-left-fixed-column": s.lastLeftFixedColumn,
          "first-right-fixed-column": s.firstRightFixedColumn,
          "header-item-class-name": s.headerItemClassName,
          "are-all-visible-rows-disabled": s.areAllVisibleRowsDisabled,
          "multiple-select-status": s.multipleSelectStatus,
          "multi-sort": s.multiSort,
          "is-multi-sorting": s.isMultiSorting,
          "get-multi-sort-number": s.getMultiSortNumber,
          onHeaderClick: t,
          onToggleSelectAll: o
        }, ke({ _: 2 }, [
          Q(n.$slots, (u, c) => ({
            name: c,
            fn: re((m) => [
              M(n.$slots, c, O({ ref_for: !0 }, m))
            ])
          }))
        ]), 1032, ["header", "index", "fixed-distance", "last-left-fixed-column", "first-right-fixed-column", "header-item-class-name", "are-all-visible-rows-disabled", "multiple-select-status", "multi-sort", "is-multi-sorting", "get-multi-sort-number"]))), 128))
      ], 2)
    ], 2)) : E("", !0);
  }
}), ss = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = s, t = a, o = f(() => e.isDisabled ?? !1), n = f(() => typeof e.bodyItemClassName == "function" ? e.bodyItemClassName(e.column, e.index) : e.bodyItemClassName), r = f(
      () => e.column === "expand" || e.column === e.expandColumn
    ), i = f(() => {
      if (e.getFixedDistance)
        return e.getFixedDistance(e.column, "td");
    }), l = f(() => e.getFixedColumnClasses ? e.getFixedColumnClasses(e.column) || [] : []), u = f(() => {
      let d = e.style || "";
      return i.value && (d += i.value), l.value.length > 0 && (d += " background-color: inherit;"), d;
    }), c = () => {
      r.value && e.expandColumn === "" && t("toggle-expand", event);
    }, m = (d) => {
      t("toggle-expand", d);
    }, g = () => {
      t("toggle-select");
    };
    return (d, v) => (b(), x("td", {
      class: S(["vdt-tbody-td px-4 py-2", [
        { "cursor-pointer": d.column === "expand" && d.expandColumn === "" },
        ...l.value,
        n.value
      ]]),
      style: Te(u.value),
      onClick: c
    }, [
      d.column === "checkbox" ? (b(), x(ie, { key: 0 }, [
        d.column === "checkbox" ? M(d.$slots, "selection-checkbox", q(O({ key: 0 }, { item: d.item, index: d.index, isDisabled: o.value, toggleSelectItem: g })), () => [
          D(yt, {
            checked: !!d.item.checkbox,
            disabled: o.value,
            onChange: g
          }, null, 8, ["checked", "disabled"])
        ]) : E("", !0)
      ], 64)) : r.value ? M(d.$slots, "expand-button", q(O({ key: 1 }, { item: d.item, expanded: d.isExpanded, toggle: m })), () => [
        w("button", {
          onClick: Ge(m, ["stop"]),
          class: "inline-flex items-center"
        }, [
          D(k(za), {
            class: S({ "transform rotate-90": d.isExpanded })
          }, null, 8, ["class"])
        ])
      ]) : M(d.$slots, `item-${d.column}`, q(O({ key: 2 }, d.item)), () => [
        M(d.$slots, `item-${d.column.toLowerCase()}`, q(le(d.item)), () => [
          M(d.$slots, "item", q(le({ column: d.column, item: d.item })), () => [
            Oe(W(k(Ca)(d.column, d.item)), 1)
          ])
        ])
      ])
    ], 6));
  }
}), os = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = s, t = a, o = f(() => typeof e.bodyRowClassName == "function" ? e.bodyRowClassName(e.item, e.index) : e.bodyRowClassName), n = (l) => {
      t("click", l, e.item, e.index);
    }, r = (l) => {
      t("dblclick", l, e.item, e.index);
    }, i = (l) => {
      t("contextmenu", l, e.item);
    };
    return (l, u) => (b(), x("tr", {
      class: S(["vdt-tbody-tr transition-colors text-vdt-content", [
        { "bg-vdt-surface": l.alternating && l.index % 2 === 0 },
        { "bg-vdt-surface-secondary": !l.alternating || l.index % 2 === 1 },
        { "hover:bg-vdt-interactive-hover": !l.noHover },
        { "divide-x border-vdt-outline": l.borderCell },
        { "border-b border-vdt-outline last:border-b-0 first:border-t": l.borderRow },
        o.value
      ]]),
      onClick: n,
      onDblclick: r,
      onContextmenu: i
    }, [
      M(l.$slots, "prepend"),
      (b(!0), x(ie, null, Q(l.columns, (c, m) => (b(), _(ss, {
        key: m,
        column: c,
        item: l.item,
        index: l.index,
        "get-fixed-distance": l.getFixedDistance,
        "get-fixed-column-classes": l.getFixedColumnClasses,
        "is-disabled": l.isDisabled,
        "expand-column": l.expandColumn,
        "is-expanded": l.isExpanded,
        "body-item-class-name": l.bodyItemClassName,
        onToggleExpand: u[0] || (u[0] = (g) => l.$emit("toggle-expand", g, l.index, l.item)),
        onToggleSelect: u[1] || (u[1] = () => l.$emit("toggle-select", l.item))
      }, ke({ _: 2 }, [
        Q(l.$slots, (g, d) => ({
          name: d,
          fn: re((v) => [
            M(l.$slots, d, O({ ref_for: !0 }, v))
          ])
        }))
      ]), 1032, ["column", "item", "index", "get-fixed-distance", "get-fixed-column-classes", "is-disabled", "expand-column", "is-expanded", "body-item-class-name"]))), 128)),
      M(l.$slots, "append")
    ], 34));
  }
}), ns = {}, ls = { class: "w-full h-[3px] relative overflow-hidden bg-gray-300" };
function rs(s, a) {
  return b(), x("div", ls, a[0] || (a[0] = [
    w("div", { class: "absolute h-[3px] w-2/5 animate-loading-line bg-vdt-primary-500" }, null, -1)
  ]));
}
const is = /* @__PURE__ */ ve(ns, [["render", rs], ["__scopeId", "data-v-9ef81a40"]]), us = ["colspan"], cs = { class: "overflow-hidden" }, ds = /* @__PURE__ */ A({
  __name: "TableExpandRow",
  props: {
    item: {},
    index: {},
    columnsCount: {},
    loading: { type: Boolean },
    isExpanded: { type: Boolean },
    bodyExpandRowClassName: { type: [String, Function] }
  },
  setup(s) {
    const a = s, e = f(() => typeof a.bodyExpandRowClassName == "function" ? a.bodyExpandRowClassName(a.item, a.index) : a.bodyExpandRowClassName);
    return (t, o) => (b(), x("tr", {
      class: S(["vdt-expand-row border-0", [e.value, { "bg-gray-50": (t.index + 1) % 2 === 0, "border-t": t.isExpanded }]])
    }, [
      w("td", {
        colspan: t.columnsCount,
        class: "relative p-0"
      }, [
        t.loading ? (b(), _(is, {
          key: 0,
          class: "mb-4"
        })) : E("", !0),
        w("div", {
          class: S(["grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out", [{ "grid-rows-[1fr]": t.isExpanded }]])
        }, [
          w("div", cs, [
            M(t.$slots, "default")
          ])
        ], 2)
      ], 8, us)
    ], 2));
  }
}), hs = { class: "flex items-center gap-2 text-sm text-vdt-content-secondary" }, gs = { class: "relative inline-block min-w-[70px]" }, fs = ["aria-expanded"], ms = { class: "block truncate" }, vs = { class: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2" }, ps = ["aria-selected", "onClick"], ks = {
  key: 0,
  class: "absolute inset-y-0 right-0 flex items-center pr-4 text-vdt-primary-600"
}, bs = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = s, t = a, o = K(!1), n = K(!1), r = f({
      get: () => e.modelValue,
      set: (g) => t("update:modelValue", g)
    }), i = Ut("dataTable");
    Y(o, (g) => {
      if (g && i?.value) {
        const d = window.innerHeight, v = i.value.getBoundingClientRect(), P = d - (v.height + v.top);
        n.value = P <= 100;
      }
    });
    const l = (g) => {
      r.value = g, o.value = !1;
    }, u = () => {
      o.value = !o.value;
    }, c = (g) => {
      g.target.closest(".relative") || (o.value = !1);
    }, m = (g) => {
      g.relatedTarget?.closest(".relative") || (o.value = !1);
    };
    return Ae(() => {
      document.addEventListener("click", c);
    }), bt(() => {
      document.removeEventListener("click", c);
    }), (g, d) => (b(), x("div", hs, [
      Oe(W(s.message) + " ", 1),
      w("div", gs, [
        w("button", {
          type: "button",
          class: S(["relative w-full cursor-pointer rounded-md bg-vdt-surface py-1.5 pl-3 pr-8 text-left text-sm shadow-xs border border-vdt-outline", [
            "focus:border-vdt-primary-500 focus:outline-hidden focus:ring-1 focus:ring-vdt-primary-500",
            o.value ? "ring-1 ring-vdt-primary-500 border-vdt-primary-500" : "hover:border-gray-400"
          ]]),
          onClick: u,
          "aria-haspopup": "listbox",
          "aria-expanded": o.value
        }, [
          w("span", ms, W(r.value), 1),
          w("span", vs, [
            (b(), x("svg", {
              class: S(["h-4 w-4 text-gray-400 transition-transform duration-200", { "rotate-180": o.value }]),
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
        ], 10, fs),
        D(Kt, {
          "enter-active-class": "transition duration-100 ease-out",
          "enter-from-class": "transform scale-95 opacity-0",
          "enter-to-class": "transform scale-100 opacity-100",
          "leave-active-class": "transition duration-75 ease-in",
          "leave-from-class": "transform scale-100 opacity-100",
          "leave-to-class": "transform scale-95 opacity-0"
        }, {
          default: re(() => [
            o.value ? (b(), x("ul", {
              key: 0,
              class: S(["absolute right-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-vdt-surface py-1 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 ring-opacity-5 focus:outline-hidden", { "bottom-full mb-1": n.value }]),
              tabindex: "-1",
              role: "listbox",
              onFocusout: m
            }, [
              (b(!0), x(ie, null, Q(s.rowsItems, (v) => (b(), x("li", {
                key: v,
                class: S(["relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm", [
                  v === r.value ? "text-vdt-primary-800 bg-vdt-primary-100 font-semibold" : "text-vdt-content hover:bg-vdt-interactive-hover"
                ]]),
                role: "option",
                "aria-selected": v === r.value,
                onClick: (P) => l(v)
              }, [
                w("span", {
                  class: S(["block", { "font-medium": v === r.value }])
                }, W(v), 3),
                v === r.value ? (b(), x("span", ks, d[1] || (d[1] = [
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
                ]))) : E("", !0)
              ], 10, ps))), 128))
            ], 34)) : E("", !0)
          ]),
          _: 1
        })
      ])
    ]));
  }
}), ys = { class: "text-sm text-vdt-content-secondary" }, Ps = /* @__PURE__ */ A({
  __name: "PaginationInfo",
  props: {
    currentPageFirstIndex: {},
    currentPageLastIndex: {},
    totalItemsLength: {},
    rowsOfPageSeparatorMessage: {}
  },
  setup(s) {
    return (a, e) => (b(), x("div", ys, [
      M(a.$slots, "default", {
        firstIndex: a.currentPageFirstIndex,
        lastIndex: a.currentPageLastIndex,
        total: a.totalItemsLength,
        separator: a.rowsOfPageSeparatorMessage
      }, () => [
        Oe(W(`${a.currentPageFirstIndex}–${a.currentPageLastIndex}`) + " " + W(a.rowsOfPageSeparatorMessage) + " " + W(a.totalItemsLength), 1)
      ])
    ]));
  }
}), xs = {
  class: "vdt-pagination flex items-center space-x-2",
  role: "navigation",
  "aria-label": "Pagination navigation"
}, ws = ["disabled"], Cs = ["disabled"], ft = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = a;
    return (t, o) => (b(), x("div", xs, [
      w("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border transition-colors border-vdt-outline bg-vdt-surface", [
          s.isFirstPage ? [
            "text-vdt-content-muted cursor-not-allowed",
            "hover:bg-vdt-surface"
          ] : [
            "text-vdt-content-secondary",
            "hover:bg-vdt-interactive-hover hover:text-vdt-content"
          ]
        ]]),
        disabled: s.isFirstPage,
        onClick: o[0] || (o[0] = (n) => e("clickPrevPage")),
        "aria-label": "Previous page"
      }, [
        D(k(Ta), {
          class: S({ "opacity-50": s.isFirstPage })
        }, null, 8, ["class"])
      ], 10, ws),
      M(t.$slots, "buttonsPagination"),
      w("button", {
        type: "button",
        class: S(["relative inline-flex items-center p-1.5 rounded-md border transition-colors border-vdt-outline bg-vdt-surface", [
          s.isLastPage ? [
            "text-vdt-content-muted cursor-not-allowed",
            "hover:bg-vdt-surface"
          ] : [
            "text-vdt-content-secondary",
            "hover:bg-vdt-interactive-hover hover:text-vdt-content"
          ]
        ]]),
        disabled: s.isLastPage,
        onClick: o[1] || (o[1] = (n) => e("clickNextPage")),
        "aria-label": "Next page"
      }, [
        D(k(Na), {
          class: S({ "opacity-50": s.isLastPage })
        }, null, 8, ["class"])
      ], 10, Cs)
    ]));
  }
}), Ss = {
  class: "vdt-pagination inline-flex rounded-md shadow-xs",
  role: "navigation",
  "aria-label": "Pagination"
}, Is = ["onClick"], me = 7, Ms = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = s, t = a, o = (r) => {
      r.type === "button" && !r.active && t("updatePage", r.page);
    }, n = f(() => {
      const r = [], { maxPaginationNumber: i, currentPaginationNumber: l } = e;
      if (i <= me) {
        for (let u = 1; u <= i; u += 1)
          r.push({
            type: "button",
            page: u,
            active: u === l,
            activePrev: u + 1 === l
          });
        return r;
      }
      if ([1, 2, i, i - 1].includes(l))
        for (let u = 1; u <= me; u += 1)
          if (u <= 3)
            r.push({
              type: "button",
              page: u,
              active: u === l,
              activePrev: u + 1 === l
            });
          else if (u === 4)
            r.push({ type: "omission" });
          else {
            const c = i - (me - u);
            r.push({
              type: "button",
              page: c,
              active: c === l,
              activePrev: c + 1 === l
            });
          }
      else if ([3, 4].includes(l))
        for (let u = 1; u <= me; u += 1)
          u <= 5 ? r.push({
            type: "button",
            page: u,
            active: u === l,
            activePrev: u + 1 === l
          }) : u === 6 ? r.push({ type: "omission" }) : r.push({
            type: "button",
            page: i,
            active: i === l,
            activePrev: !1
          });
      else if ([i - 2, i - 3].includes(l))
        for (let u = 1; u <= me; u += 1)
          if (u === 1)
            r.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (u === 2)
            r.push({ type: "omission" });
          else {
            const c = i - (me - u);
            r.push({
              type: "button",
              page: c,
              active: c === l,
              activePrev: c + 1 === l
            });
          }
      else
        for (let u = 1; u <= me; u += 1)
          if (u === 1)
            r.push({
              type: "button",
              page: 1,
              active: l === 1,
              activePrev: !1
            });
          else if (u === 2 || u === 6)
            r.push({ type: "omission" });
          else if (u === 7)
            r.push({
              type: "button",
              page: i,
              active: i === l,
              activePrev: !1
            });
          else {
            const c = 4 - u, m = l - c;
            r.push({
              type: "button",
              page: m,
              active: m === l,
              activePrev: m + 1 === l
            });
          }
      return r;
    });
    return (r, i) => (b(), x("div", Ss, [
      (b(!0), x(ie, null, Q(n.value, (l, u) => (b(), x("div", {
        key: u,
        class: S(["relative inline-flex items-center justify-center", [
          // Common styles for all items
          "min-w-[32px] h-8 text-sm transition-colors",
          // First item styles
          u === 0 && "rounded-l-md",
          // Last item styles
          u === n.value.length - 1 && "rounded-r-md",
          // Button specific styles
          l.type === "button" && [
            "border border-vdt-outline",
            // Active state
            l.active ? [
              "z-10",
              "bg-vdt-primary-500 border-vdt-primary-500 text-white",
              "relative"
            ] : [
              "bg-vdt-surface",
              "text-vdt-content",
              "hover:bg-vdt-interactive-hover",
              "focus:z-10 focus:outline-hidden focus:ring-1",
              "focus:ring-vdt-primary-500",
              "focus:border-vdt-primary-500"
            ],
            // Disable hover effect for active button
            !l.active && "cursor-pointer",
            // Connect borders for middle buttons
            u !== 0 && "-ml-px"
          ],
          // Omission (ellipsis) styles
          l.type === "omission" && [
            "bg-vdt-surface border border-vdt-outline text-vdt-content-muted",
            u !== 0 && "-ml-px"
          ]
        ]]),
        onClick: (c) => o(l)
      }, [
        l.type === "button" ? (b(), x("span", {
          key: 0,
          class: S(["px-3 py-1.5", { "font-medium": l.active }])
        }, W(l.page), 3)) : (b(), _(k(Da), { key: 1 }))
      ], 10, Is))), 128))
    ]));
  }
}), $s = { class: "flex-1 flex justify-center" }, Fs = { class: "text-sm text-vdt-content px-3" }, Ns = { class: "flex-1 flex items-center justify-start" }, Bs = {
  key: 0,
  class: "text-sm"
}, Rs = { class: "flex-1 flex items-center justify-center" }, Ls = {
  key: 0,
  class: "text-sm"
}, Ts = { class: "flex-1 flex items-center justify-end" }, As = /* @__PURE__ */ A({
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
  setup(s, { emit: a }) {
    const e = s, t = a;
    f(() => ({
      rowsPerPage: e.rowsPerPage,
      rowsItems: e.rowsItems,
      rowsPerPageMessage: e.rowsPerPageMessage,
      updateRowsPerPage: (n) => t("update:rowsPerPage", n)
    })), f(() => ({
      currentPageFirstIndex: e.currentPageFirstIndex,
      currentPageLastIndex: e.currentPageLastIndex,
      totalItemsLength: e.totalItemsLength,
      rowsOfPageSeparatorMessage: e.rowsOfPageSeparatorMessage
    })), f(() => ({
      isFirstPage: e.isFirstPage,
      isLastPage: e.isLastPage,
      currentPaginationNumber: e.currentPaginationNumber,
      maxPaginationNumber: e.maxPaginationNumber,
      buttonsPagination: e.buttonsPagination,
      nextPage: () => t("nextPage"),
      prevPage: () => t("prevPage"),
      updatePage: (n) => t("updatePage", n)
    }));
    const o = f(() => ({
      // 原始 props (扁平化，方便直接使用)
      ...e,
      // 分頁資訊 (結構化)
      paginationInfo: {
        currentPageFirstIndex: e.currentPageFirstIndex,
        currentPageLastIndex: e.currentPageLastIndex,
        totalItemsLength: e.totalItemsLength,
        rowsOfPageSeparatorMessage: e.rowsOfPageSeparatorMessage
      },
      // 分頁操作 (結構化)
      pagination: {
        isFirstPage: e.isFirstPage,
        isLastPage: e.isLastPage,
        currentPaginationNumber: e.currentPaginationNumber,
        maxPaginationNumber: e.maxPaginationNumber,
        buttonsPagination: e.buttonsPagination,
        nextPage: () => t("nextPage"),
        prevPage: () => t("prevPage"),
        updatePage: (n) => t("updatePage", n)
      },
      // 每頁行數 (結構化)
      rowsPerPage: {
        current: e.rowsPerPage,
        options: e.rowsItems,
        message: e.rowsPerPageMessage,
        update: (n) => t("update:rowsPerPage", n)
      },
      // 便利方法 (扁平化，向後相容)
      updateRowsPerPage: (n) => t("update:rowsPerPage", n),
      nextPage: () => t("nextPage"),
      prevPage: () => t("prevPage"),
      updatePage: (n) => t("updatePage", n)
    }));
    return (n, r) => (b(), x("div", {
      class: S(["vdt-footer", [
        "bg-vdt-surface border border-vdt-outline border-t-0",
        { "shadow-sm": n.showShadow },
        n.footerClassName
      ]])
    }, [
      M(n.$slots, "footer-mobile", q(le(o.value)), () => [
        w("div", {
          class: S(["vdt-footer-mobile sm:hidden px-4 py-3 w-full", n.mobileFooterClasses])
        }, [
          D(ft, {
            "is-first-page": n.isFirstPage,
            "is-last-page": n.isLastPage,
            onClickNextPage: r[0] || (r[0] = () => t("nextPage")),
            onClickPrevPage: r[1] || (r[1] = () => t("prevPage")),
            class: "sm:hidden flex items-center justify-between w-full"
          }, {
            buttonsPagination: re(() => [
              w("div", $s, [
                w("span", Fs, W(n.currentPaginationNumber) + " / " + W(n.maxPaginationNumber), 1)
              ])
            ]),
            _: 1
          }, 8, ["is-first-page", "is-last-page"])
        ], 2)
      ]),
      M(n.$slots, "footer-desktop", q(le(o.value)), () => [
        w("div", {
          class: S(["vdt-footer-desktop hidden sm:flex items-center justify-between px-4 py-3 w-full", n.desktopFooterClasses])
        }, [
          w("div", Ns, [
            M(n.$slots, "rows-per-page", O(o.value.rowsPerPage, { rawProps: o.value }), () => [
              n.hideRowsPerPage ? E("", !0) : (b(), x("div", Bs, [
                D(bs, {
                  "model-value": n.rowsPerPage,
                  "rows-items": n.rowsItems,
                  message: n.rowsPerPageMessage,
                  "onUpdate:modelValue": r[2] || (r[2] = (i) => t("update:rowsPerPage", i))
                }, null, 8, ["model-value", "rows-items", "message"])
              ]))
            ])
          ]),
          w("div", Rs, [
            M(n.$slots, "pagination-info", O(o.value.paginationInfo, { rawProps: o.value }), () => [
              n.hidePaginationInfo ? E("", !0) : (b(), x("div", Ls, [
                D(Ps, {
                  "current-page-first-index": n.currentPageFirstIndex,
                  "current-page-last-index": n.currentPageLastIndex,
                  "total-items-length": n.totalItemsLength,
                  "rows-of-page-separator-message": n.rowsOfPageSeparatorMessage
                }, null, 8, ["current-page-first-index", "current-page-last-index", "total-items-length", "rows-of-page-separator-message"])
              ]))
            ])
          ]),
          w("div", Ts, [
            M(n.$slots, "pagination", O(o.value.pagination, { rawProps: o.value }), () => [
              D(ft, {
                "is-first-page": n.isFirstPage,
                "is-last-page": n.isLastPage,
                onClickNextPage: r[4] || (r[4] = () => t("nextPage")),
                onClickPrevPage: r[5] || (r[5] = () => t("prevPage"))
              }, ke({ _: 2 }, [
                n.buttonsPagination ? {
                  name: "buttonsPagination",
                  fn: re(() => [
                    D(Ms, {
                      "current-pagination-number": n.currentPaginationNumber,
                      "max-pagination-number": n.maxPaginationNumber,
                      onUpdatePage: r[3] || (r[3] = (i) => t("updatePage", i))
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
}), Ze = {
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
function mt(s) {
  const a = s.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)(?:\s*\/\s*([0-9.]+))?\s*\)/);
  if (!a) return null;
  const [e, t, o, n] = a.map(Number);
  return { lightness: t, chroma: o, hue: n };
}
function Os(s) {
  s = s.replace(/^#/, ""), s.length === 3 && (s = s.split("").map((o) => o + o).join(""));
  const a = parseInt(s.slice(0, 2), 16), e = parseInt(s.slice(2, 4), 16), t = parseInt(s.slice(4, 6), 16);
  return {
    r: a / 255,
    g: e / 255,
    b: t / 255
  };
}
function Es(s) {
  const a = s.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/);
  if (a) {
    const [t, o, n, r] = a.map(Number);
    return {
      r: Math.max(0, Math.min(255, o)) / 255,
      g: Math.max(0, Math.min(255, n)) / 255,
      b: Math.max(0, Math.min(255, r)) / 255
    };
  }
  const e = s.match(/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9]*\.?[0-9]+)\s*\)$/);
  if (e) {
    const [t, o, n, r] = e.map(Number);
    return {
      r: Math.max(0, Math.min(255, o)) / 255,
      g: Math.max(0, Math.min(255, n)) / 255,
      b: Math.max(0, Math.min(255, r)) / 255
    };
  }
  return null;
}
function Pt(s) {
  const { r: a, g: e, b: t } = s, o = a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), n = e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4), r = t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4), i = 0.4124 * o + 0.3576 * n + 0.1805 * r, l = 0.2126 * o + 0.7152 * n + 0.0722 * r, u = 0.0193 * o + 0.1192 * n + 0.9505 * r, c = 0.95047, m = 1, g = 1.08883, d = i > 8856e-6 ? Math.pow(i / c, 1 / 3) : 7.787 * i / c + 16 / 116, v = l > 8856e-6 ? Math.pow(l / m, 1 / 3) : 7.787 * l / m + 16 / 116, P = u > 8856e-6 ? Math.pow(u / g, 1 / 3) : 7.787 * u / g + 16 / 116, $ = 116 * v - 16, F = 500 * (d - v), L = 200 * (v - P);
  return { l: $, a: F, b: L };
}
function xt(s) {
  const { l: a, a: e, b: t } = s, o = Math.sqrt(e * e + t * t);
  let n = Math.atan2(t, e) * 180 / Math.PI;
  return n < 0 && (n += 360), { l: a, c: o, h: n };
}
function Ds(s) {
  const a = Os(s), e = Pt(a), t = xt(e);
  let o = t.h;
  return o > 0 && o < 60 && (o = o * 0.7), {
    lightness: t.l,
    chroma: Math.min(t.c / 150, 0.4),
    hue: o
  };
}
function Hs(s) {
  const a = Pt(s), e = xt(a);
  let t = e.h;
  return t > 0 && t < 60 && (t = t * 0.7), {
    lightness: e.l,
    chroma: Math.min(e.c / 150, 0.4),
    hue: t
  };
}
function js(s, a) {
  const e = Math.min(
    Math.abs(s.hue - a.hue),
    360 - Math.abs(s.hue - a.hue)
  ), t = e > 60 ? 30 : 5;
  return Math.sqrt(
    Math.pow((s.lightness - a.lightness) * 1.5, 2) + Math.pow((s.chroma - a.chroma) * 2, 2) + Math.pow(e / 360 * t, 2) * 100
  );
}
function Vs(s) {
  return s.startsWith("oklch(");
}
function zs(s) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
}
function qs(s) {
  return s in Ze;
}
function Ws(s) {
  return s.startsWith("rgb(") || s.startsWith("rgba(");
}
function vt(s) {
  const a = "violet";
  if (qs(s))
    return s;
  let e = null;
  if (Vs(s))
    e = mt(s);
  else if (zs(s))
    e = Ds(s);
  else if (Ws(s)) {
    const n = Es(s);
    console.log("Parsed RGB:", n), n && (e = Hs(n), console.log("Converted to OKLCH:", e));
  }
  if (!e) return a;
  let t = a, o = 1 / 0;
  for (const [n, r] of Object.entries(Ze))
    for (const i of ["300", "400", "500", "600", "700"]) {
      const l = r[i];
      if (!l) continue;
      const u = mt(l);
      if (!u) continue;
      const c = js(e, u);
      c < o && (o = c, t = n);
    }
  return t;
}
function Us(s) {
  return Ze[s] || {};
}
class Ks {
  instances = /* @__PURE__ */ new Map();
  mediaQuery = null;
  listeners = /* @__PURE__ */ new Map();
  constructor() {
    this.initializeSystemPreference();
  }
  /**
   * 初始化系統偏好檢測
   */
  initializeSystemPreference() {
    typeof window < "u" && window.matchMedia && (this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)"), this.mediaQuery.addEventListener("change", this.handleSystemThemeChange.bind(this)));
  }
  /**
   * 處理系統主題變化
   */
  handleSystemThemeChange(a) {
    const e = a.matches ? "dark" : "light";
    this.instances.forEach((t, o) => {
      t.systemPreference = e, t.userPreference === "auto" && this.updateCurrentMode(o);
    });
  }
  /**
   * 獲取當前系統偏好
   */
  getSystemPreference() {
    return this.mediaQuery && this.mediaQuery.matches ? "dark" : "light";
  }
  /**
   * 創建新的主題實例
   */
  createInstance(a, e = {}) {
    const t = a || this.generateInstanceId(), o = {
      currentMode: "light",
      userPreference: e.defaultMode || "auto",
      systemPreference: this.getSystemPreference(),
      color: vt(e.defaultColor || "violet"),
      instanceId: t
    };
    return this.instances.set(t, o), this.listeners.set(t, []), this.updateCurrentMode(t), typeof document < "u" && setTimeout(() => {
      this.applyColorToDOM(t), this.applyModeToDOM(t);
    }, 0), t;
  }
  /**
   * 銷毀主題實例
   */
  destroyInstance(a) {
    this.instances.delete(a), this.listeners.delete(a);
  }
  /**
   * 生成實例 ID
   */
  generateInstanceId() {
    return `vdt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * 更新當前模式
   */
  updateCurrentMode(a) {
    const e = this.instances.get(a);
    if (!e) return;
    const t = e.currentMode;
    e.userPreference === "auto" ? e.currentMode = e.systemPreference : e.currentMode = e.userPreference, t !== e.currentMode && (this.applyModeToDOM(a), this.notifyListeners(a));
  }
  /**
   * 應用模式到特定的 DOM 元素
   */
  applyModeToDOM(a) {
    if (typeof document > "u") return;
    const e = this.instances.get(a);
    if (!e) return;
    const t = document.querySelector(`[data-vdt-instance="${a}"]`);
    if (!t) {
      setTimeout(() => this.applyModeToDOM(a), 10);
      return;
    }
    e.userPreference === "auto" ? t.removeAttribute("data-vdt-mode") : t.setAttribute("data-vdt-mode", e.currentMode);
  }
  /**
   * 應用顏色到特定的 DOM 元素
   */
  applyColorToDOM(a) {
    if (typeof document > "u") return;
    const e = this.instances.get(a);
    if (!e) return;
    const t = document.querySelector(`[data-vdt-instance="${a}"]`);
    if (!t) {
      setTimeout(() => this.applyColorToDOM(a), 10);
      return;
    }
    const o = Us(e.color);
    this.checkForUserOverride(t, o) ? Object.keys(o).forEach((r) => {
      t.style.removeProperty(`--color-vdt-${r}`);
    }) : Object.entries(o).forEach(([r, i]) => {
      t.style.setProperty(`--color-vdt-${r}`, i);
    });
  }
  /**
   * 檢查用戶是否有 CSS 覆蓋
   */
  checkForUserOverride(a, e) {
    const t = {};
    Object.keys(e).forEach((m) => {
      const g = `--color-vdt-${m}`;
      t[g] = a.style.getPropertyValue(g), a.style.removeProperty(g);
    });
    const n = getComputedStyle(a).getPropertyValue("--color-vdt-500").trim();
    if (Object.entries(t).forEach(([m, g]) => {
      g && a.style.setProperty(m, g);
    }), !n) return !1;
    const r = "oklch(60.6% 0.25 292.717)", i = e[500], l = this.isOklchEqual(n, r), u = this.isOklchEqual(n, i);
    return !l && !u;
  }
  /**
   * 解析 OKLCH 值為數值以便比較
   */
  parseOklchForComparison(a) {
    const e = a.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/);
    return e ? {
      l: parseFloat(e[1]),
      c: parseFloat(e[2]),
      h: parseFloat(e[3])
    } : null;
  }
  /**
   * 比較兩個 OKLCH 顏色是否相等（容許小數點誤差）
   */
  isOklchEqual(a, e, t = 1e-3) {
    const o = this.parseOklchForComparison(a), n = this.parseOklchForComparison(e);
    return !o || !n ? a.trim() === e.trim() : Math.abs(o.l - n.l) < t && Math.abs(o.c - n.c) < t && Math.abs(o.h - n.h) < t;
  }
  /**
   * 通知監聽器
   */
  notifyListeners(a) {
    const e = this.instances.get(a), t = this.listeners.get(a);
    e && t && t.forEach((o) => o({ ...e }));
  }
  /**
   * 設置主題模式
   */
  setMode(a, e) {
    const t = this.instances.get(a);
    t && (t.userPreference = e, this.updateCurrentMode(a));
  }
  /**
   * 設置主題顏色
   */
  setColor(a, e) {
    const t = this.instances.get(a);
    if (!t) return;
    const o = vt(e);
    t.color = o, this.applyColorToDOM(a), this.notifyListeners(a);
  }
  /**
   * 獲取實例狀態
   */
  getState(a) {
    const e = this.instances.get(a);
    return e ? { ...e } : null;
  }
  /**
   * 獲取主題類別（用於組件）
   */
  getThemeClasses(a) {
    const e = this.instances.get(a);
    return e ? {
      // 穩定的通用類名
      "vdt-datatable": !0,
      "vdt-themed": !0,
      // 主題色相關類名
      [`vdt-theme-${e.color}`]: !0,
      // 模式相關類名
      [`vdt-mode-${e.currentMode}`]: !0,
      "vdt-mode-auto": e.userPreference === "auto",
      // 實例相關（用於調試，但不應用於 CSS）
      [`vdt-instance-${a}`]: !0
    } : {};
  }
  /**
   * 獲取容器屬性
   */
  getContainerAttributes(a) {
    const e = this.instances.get(a);
    if (!e) return {};
    const t = {
      "data-vdt-instance": a,
      "data-vdt-theme": e.color,
      "data-vdt-mode-preference": e.userPreference
    };
    return e.userPreference !== "auto" && (t["data-vdt-mode"] = e.currentMode), t;
  }
  /**
   * 強制重新應用主題（用於調試或強制刷新）
   */
  reapplyTheme(a) {
    this.applyColorToDOM(a), this.applyModeToDOM(a);
  }
  /**
   * 添加監聽器
   */
  addListener(a, e) {
    const t = this.listeners.get(a);
    return t ? (t.push(e), () => {
      const o = t.indexOf(e);
      o > -1 && t.splice(o, 1);
    }) : () => {
    };
  }
  /**
   * 銷毀管理器
   */
  destroy() {
    this.mediaQuery && this.mediaQuery.removeEventListener("change", this.handleSystemThemeChange.bind(this)), this.instances.clear(), this.listeners.clear();
  }
}
const Z = new Ks();
function Qs(s = {}) {
  const a = K(
    Z.createInstance(s.instanceId, {
      defaultColor: s.defaultColor,
      defaultMode: s.defaultMode || "auto"
    })
  ), e = K(
    Z.getState(a.value)
  );
  let t = null;
  const o = f(() => a.value ? Z.getContainerAttributes(a.value) : {}), n = (c) => {
    a.value && Z.setColor(a.value, c);
  }, r = (c) => {
    a.value && Z.setMode(a.value, c);
  }, i = () => {
    if (e.value)
      if (e.value.userPreference === "auto") {
        const c = e.value.currentMode === "light" ? "dark" : "light";
        r(c);
      } else {
        const c = e.value.currentMode === "light" ? "dark" : "light";
        r(c);
      }
  }, l = () => {
    a.value && Z.setMode(a.value, "auto");
  }, u = f(() => typeof window > "u" ? !1 : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches !== void 0);
  return Ae(async () => {
    await Qt(), e.value = Z.getState(a.value), t = Z.addListener(a.value, (c) => {
      e.value = c;
    }), setTimeout(() => {
      Z.reapplyTheme(a.value);
    }, 10);
  }), bt(() => {
    t && t(), a.value && Z.destroyInstance(a.value);
  }), {
    // 響應式狀態
    containerAttributes: o,
    supportsColorScheme: u,
    // 當前狀態
    themeState: f(() => e.value),
    currentMode: f(() => e.value?.currentMode || "light"),
    currentColor: f(() => e.value?.color || "violet"),
    // 主要方法
    setColor: n,
    setMode: r,
    toggle: i,
    setAuto: l
  };
}
const Js = ["id"], Gs = {
  key: 0,
  class: "absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50"
}, Zs = { class: "relative z-10" }, Xs = {
  key: 1,
  class: "absolute inset-0 flex items-center justify-center text-vdt-content-muted bg-vdt-surface-elevated"
}, Ys = {
  key: 0,
  class: "vdt-footer-section"
}, wt = /* @__PURE__ */ A({
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
    mode: {},
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
  setup(s, { expose: a, emit: e }) {
    const t = s, {
      checkboxColumnWidth: o,
      expandColumnWidth: n,
      indexColumnWidth: r,
      rowsItems: i,
      showIndexSymbol: l,
      currentPage: u,
      filterOptions: c,
      headers: m,
      itemsSelected: g,
      loading: d,
      items: v,
      rowsPerPage: P,
      searchField: $,
      searchValue: F,
      serverItemsLength: L,
      showIndex: T,
      sortBy: ee,
      sortType: H,
      serverOptions: ue,
      multiSort: te,
      mustSort: be,
      clickEventType: ye,
      clickRowToExpand: Pe,
      clickRowToSelect: J,
      fixedExpand: xe,
      fixedCheckbox: N,
      fixedIndex: j,
      batchSelectionThreshold: ae,
      expandColumn: ce
    } = Jt(t), {
      containerAttributes: y,
      setColor: p,
      setMode: C,
      setAuto: V
    } = Qs({
      defaultColor: t.theme,
      defaultMode: t.mode
    });
    Y(() => t.theme, (h) => {
      h && p(h);
    }), Y(() => t.mode, (h) => {
      h ? C(h) : V();
    });
    const z = kt(), se = f(() => !!z.expand), Fe = f(() => !!z.body), Ne = f(() => {
      const h = {};
      return ["rows-per-page", "pagination-info", "pagination"].forEach((I) => {
        z[I] && (h[I] = z[I]);
      }), Object.keys(z).forEach((I) => {
        I.startsWith("footer-") && I !== "footer-content" && (h[I] = z[I]);
      }), h;
    }), Ee = f(
      () => typeof t.expandTransition < "u" ? t.expandTransition : se.value
    ), Be = K(null), G = K(null);
    Gt("dataTable", Be);
    const de = e, De = f(() => g.value !== null), he = f(() => ue.value !== null), Ct = f(() => ({
      // 分頁相關
      currentPaginationNumber: oe.value,
      maxPaginationNumber: Ce.value,
      isFirstPage: Ie.value,
      isLastPage: Se.value,
      // 資料相關
      currentPageFirstIndex: ze.value,
      currentPageLastIndex: qe.value,
      totalItemsLength: we.value,
      // 每頁行數相關
      rowsPerPage: fe.value,
      rowsItems: je.value,
      rowsPerPageMessage: t.rowsPerPageMessage,
      rowsOfPageSeparatorMessage: t.rowsOfPageSeparatorMessage,
      // 配置相關
      hideRowsPerPage: t.hideRowsPerPage,
      hidePaginationInfo: t.hidePaginationInfo,
      buttonsPagination: t.buttonsPagination,
      // 方法
      nextPage: Me,
      prevPage: $e,
      updatePage: pe,
      updateRowsPerPage: Ve,
      // 原始資料（如果需要的話）
      items: ne.value,
      headers: ge.value,
      // 選擇相關
      selectedItems: et.value,
      multipleSelectStatus: at.value,
      // 主題
      theme: t.theme
    })), St = f(() => ({
      hideFooter: !1,
      // 已在外層處理
      hideRowsPerPage: t.hideRowsPerPage,
      hidePaginationInfo: t.hidePaginationInfo,
      buttonsPagination: t.buttonsPagination,
      showShadow: it.value,
      footerClassName: t.footerClassName,
      mobileFooterClasses: t.mobileFooterClasses,
      desktopFooterClasses: t.desktopFooterClasses,
      rowsPerPage: fe.value,
      rowsItems: je.value,
      rowsPerPageMessage: t.rowsPerPageMessage,
      rowsOfPageSeparatorMessage: t.rowsOfPageSeparatorMessage,
      currentPageFirstIndex: ze.value,
      currentPageLastIndex: qe.value,
      totalItemsLength: we.value,
      currentPaginationNumber: oe.value,
      maxPaginationNumber: Ce.value,
      isFirstPage: Ie.value,
      isLastPage: Se.value
    })), {
      serverOptionsComputed: He,
      updateServerOptionsPage: It,
      updateServerOptionsSort: Mt,
      updateServerOptionsRowsPerPage: $t
    } = ba(
      ue,
      te,
      de
    ), {
      clientSortOptions: Xe,
      headerColumns: Ye,
      headersForRender: ge,
      updateSortField: Ft,
      isMultiSorting: Nt,
      getMultiSortNumber: Bt
    } = ca(
      l,
      o,
      n,
      N,
      xe,
      j,
      m,
      se,
      r,
      De,
      he,
      be,
      He,
      T,
      ee,
      H,
      te,
      ce,
      Mt,
      de
    ), {
      rowsItemsComputed: je,
      rowsPerPageRef: fe,
      updateRowsPerPage: Ve
    } = ka(
      he,
      i,
      ue,
      P
    ), {
      totalItems: _e,
      selectItemsComputed: et,
      totalItemsLength: we,
      toggleSelectAll: Rt,
      toggleSelectItem: tt,
      isProcessing: Lt,
      processProgress: Tt
    } = Ia(
      Xe,
      c,
      he,
      v,
      g,
      $,
      F,
      L,
      te,
      ae,
      t.disabledRows,
      de
    ), {
      currentPaginationNumber: oe,
      maxPaginationNumber: Ce,
      isLastPage: Se,
      isFirstPage: Ie,
      nextPage: Me,
      prevPage: $e,
      updatePage: pe,
      updateCurrentPaginationNumber: At
    } = pa(
      u,
      he,
      d,
      we,
      fe,
      ue,
      It
    ), {
      currentPageFirstIndex: ze,
      currentPageLastIndex: qe,
      multipleSelectStatus: at,
      pageItems: ne
    } = va(
      oe,
      De,
      he,
      v,
      fe,
      et,
      T,
      _e,
      we,
      t.disabledRows
    ), Re = f(() => oe.value === 0 ? 0 : (oe.value - 1) * fe.value), {
      expandingItemIndexList: We,
      updateExpandingItemIndexList: st,
      clearExpandingItemIndexList: ot
    } = ia(
      ne,
      Re,
      de
    ), {
      fixedHeaders: Ue,
      lastLeftFixedColumn: nt,
      firstRightFixedColumn: lt,
      fixedColumnsInfos: rt,
      showShadow: it
    } = ua(
      ge,
      G
    ), Ot = (h) => {
      const I = h.width ?? (Ue.value.length ? 100 : null);
      if (I) return `width: ${I}px; min-width: ${I}px;`;
    }, ut = (h, I = "th") => {
      if (!Ue.value.length) return;
      const B = rt.value.find((R) => R.value === h);
      if (B)
        return `
            position: sticky;
            ${B.position === "left" ? `left: ${B.distance}px;` : `right: ${B.distance}px;`}
            z-index: ${I === "th" ? 3 : 1};
        `;
    }, ct = K(!1);
    Zt(() => {
      G.value && (ct.value = G.value.scrollWidth > G.value.clientWidth);
    });
    const Et = f(() => (h) => {
      if (!Ue.value.length) return [];
      const I = [];
      return rt.value.find((R) => R.value === h) && (I.push("fixed-column"), h === nt.value ? I.push("fixed-left-shadow") : h === lt.value && I.push("fixed-right-shadow")), I;
    }), Dt = (h) => {
      h.sortable && h.sortType && Ft(h.value, h.sortType);
    }, Ke = (h) => typeof t.disabledRows == "function" ? t.disabledRows(h) : !1, Ht = f(() => ne.value.every((h) => t.disabledRows(h))), jt = (h) => {
      Ke(h) || tt(h);
    }, {
      handleRowClick: Vt,
      handleRowDoubleClick: zt,
      handleRowContextMenu: qt
    } = ra(
      ye,
      De,
      T,
      Ke,
      Pe,
      J,
      st,
      tt,
      de
    );
    return Y(d, (h, I) => {
      He.value && h === !1 && I === !0 && (At(He.value.page), ot());
    }), Y(fe, (h) => {
      he.value ? $t(h) : pe(1);
    }), Y([F, c], () => {
      he.value || pe(1);
    }), Y([oe, Xe, $, F, c], () => {
      ot();
    }, { deep: !0 }), Y(ne, (h) => {
      de("updatePageItems", h);
    }, { deep: !0 }), Y(_e, (h) => {
      de("updateTotalItems", h);
    }, { deep: !0 }), Ae(() => {
      if (G.value) {
        const h = G.value, I = () => {
          ct.value = h.scrollWidth > h.clientWidth;
        };
        I(), h.addEventListener("scroll", I), window.addEventListener("resize", I);
        const B = new MutationObserver(I);
        B.observe(h, {
          childList: !0,
          subtree: !0,
          attributes: !0
        }), pt(() => {
          h.removeEventListener("scroll", I), window.addEventListener("resize", I), B.disconnect();
        });
      }
    }), a({
      currentPageFirstIndex: ze,
      currentPageLastIndex: qe,
      clientItemsLength: we,
      maxPaginationNumber: Ce,
      currentPaginationNumber: oe,
      isLastPage: Se,
      isFirstPage: Ie,
      nextPage: Me,
      prevPage: $e,
      updatePage: pe,
      rowsPerPageOptions: je,
      rowsPerPageActiveOption: fe,
      updateRowsPerPageActiveOption: Ve
    }), (h, I) => (b(), x("div", O({
      ref_key: "tableWrapper",
      ref: Be,
      class: ["vdt-table-wrapper relative w-full", [h.wrapperClassName]]
    }, k(y)), [
      w("div", {
        ref_key: "tableContainer",
        ref: G,
        class: S(["vdt-table-container relative overflow-auto border border-vdt-outline scroll-smooth min-h-[180px]", [{ "shadow-xs show-shadow": k(it) }, h.containerClassName]])
      }, [
        w("table", {
          id: h.tableNodeId,
          class: S(["vdt-table w-full border-collapse bg-vdt-surface", [h.tableClassName]])
        }, [
          w("colgroup", null, [
            (b(!0), x(ie, null, Q(k(ge), (B, R) => (b(), x("col", {
              key: R,
              style: Te(Ot(B))
            }, null, 4))), 128))
          ]),
          k(z)["customize-headers"] ? M(h.$slots, "customize-headers", { key: 0 }) : E("", !0),
          D(as, O({
            headers: k(ge),
            hideHeader: h.hideHeader,
            fixedHeader: h.fixedHeader,
            headerClassName: h.headerClassName,
            borderCell: h.borderCell,
            lastLeftFixedColumn: k(nt),
            firstRightFixedColumn: k(lt),
            headerItemClassName: h.headerItemClassName,
            areAllVisibleRowsDisabled: Ht.value,
            multipleSelectStatus: k(at),
            multiSort: k(te)
          }, {
            "is-multi-sorting": k(Nt),
            "get-multi-sort-number": k(Bt),
            "get-fixed-distance": ut,
            onHeaderClick: Dt,
            onToggleSelectAll: k(Rt)
          }), ke({ _: 2 }, [
            Q(h.$slots, (B, R) => ({
              name: R,
              fn: re((U) => [
                M(h.$slots, R, q(le(U)))
              ])
            }))
          ]), 1040, ["is-multi-sorting", "get-multi-sort-number", "onToggleSelectAll"]),
          Fe.value ? M(h.$slots, "body", q(O({ key: 1 }, k(ne)))) : k(Ye).length ? (b(), x("tbody", {
            key: 2,
            class: S(["vdt-tbody text-sm", [h.bodyClassName]])
          }, [
            M(h.$slots, "body-prepend", q(le({
              items: k(ne),
              pagination: { isFirstPage: k(Ie), isLastPage: k(Se), currentPaginationNumber: k(oe), maxPaginationNumber: k(Ce), nextPage: k(Me), prevPage: k($e) },
              headers: k(ge)
            }))),
            (b(!0), x(ie, null, Q(k(ne), (B, R) => (b(), x(ie, {
              key: B.key || R
            }, [
              D(os, {
                item: B,
                index: R,
                columns: k(Ye),
                alternating: h.alternating,
                "no-hover": h.noHover,
                "border-cell": h.borderCell,
                "border-row": h.borderRow,
                "body-row-className": h.bodyRowClassName,
                "body-item-class-name": h.bodyItemClassName,
                "is-expanded": k(We).includes(R + Re.value),
                "is-disabled": Ke(B),
                "expand-column": k(ce),
                "get-fixed-distance": ut,
                "get-fixed-column-classes": Et.value,
                onClick: (U) => k(Vt)(U, B, R),
                onDblclick: (U) => k(zt)(U, B, R),
                onContextmenu: (U) => k(qt)(U, B),
                onToggleExpand: (U) => k(st)(R, B, U),
                onToggleSelect: (U) => jt(B)
              }, ke({ _: 2 }, [
                Q(h.$slots, (U, dt) => ({
                  name: dt,
                  fn: re((Wt) => [
                    M(h.$slots, dt, O({ ref_for: !0 }, Wt))
                  ])
                }))
              ]), 1032, ["item", "index", "columns", "alternating", "no-hover", "border-cell", "border-row", "body-row-className", "body-item-class-name", "is-expanded", "is-disabled", "expand-column", "get-fixed-column-classes", "onClick", "onDblclick", "onContextmenu", "onToggleExpand", "onToggleSelect"]),
              Ee.value || k(We).includes(R + Re.value) ? (b(), _(ds, {
                key: 0,
                item: B,
                index: R,
                "columns-count": k(ge).length,
                loading: B.expandLoading,
                "is-expanded": k(We).includes(R + Re.value),
                "body-expand-row-className": h.bodyExpandRowClassName
              }, {
                default: re(() => [
                  M(h.$slots, "expand", O({ ref_for: !0 }, B))
                ]),
                _: 2
              }, 1032, ["item", "index", "columns-count", "loading", "is-expanded", "body-expand-row-className"])) : E("", !0)
            ], 64))), 128)),
            M(h.$slots, "body-append", q(le({
              items: k(ne),
              pagination: { isFirstPage: k(Ie), isLastPage: k(Se), currentPaginationNumber: k(oe), maxPaginationNumber: k(Ce), nextPage: k(Me), prevPage: k($e), updatePage: k(pe) },
              headers: k(ge)
            })))
          ], 2)) : E("", !0)
        ], 10, Js),
        k(d) ? (b(), x("div", Gs, [
          w("div", Zs, [
            M(h.$slots, "loading", {}, () => [
              D(ea)
            ])
          ])
        ])) : E("", !0),
        !k(ne).length && !k(d) ? (b(), x("div", Xs, [
          M(h.$slots, "empty-message", {}, () => [
            Oe(W(h.emptyMessage), 1)
          ])
        ])) : E("", !0)
      ], 2),
      h.hideFooter ? E("", !0) : (b(), x("div", Ys, [
        h.$slots["footer-content"] ? M(h.$slots, "footer-content", q(O({ key: 0 }, Ct.value))) : (b(), _(As, O({ key: 1 }, St.value, {
          "onUpdate:rowsPerPage": k(Ve),
          onNextPage: k(Me),
          onPrevPage: k($e),
          onUpdatePage: k(pe)
        }), ke({ _: 2 }, [
          Q(Ne.value, (B, R) => ({
            name: R,
            fn: re((U) => [
              M(h.$slots, R, q(le(U)))
            ])
          }))
        ]), 1040, ["onUpdate:rowsPerPage", "onNextPage", "onPrevPage", "onUpdatePage"]))
      ])),
      Qe(D(la, { progress: k(Tt) }, null, 8, ["progress"]), [
        [Je, k(Lt)]
      ])
    ], 16));
  }
}), _s = (s) => {
  s.component("DataTable", wt);
};
wt.install = _s;
export {
  to as createFilter,
  wt as default,
  _s as install
};
