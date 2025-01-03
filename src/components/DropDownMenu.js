// src/components/DropdownMenu.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categoryMapping } from "../utils/categoryMapping";

function buildCategoryQuery(cat, subCat, subSubCat) {
  const params = new URLSearchParams();

  // Si tu intención es siempre limpiar la búsqueda anterior:
  // no agregues params.set("search", ...)

  if (cat) params.set("categoria", cat);
  if (subCat) params.set("subcategoria", subCat);
  if (subSubCat) params.set("subsubcategoria", subSubCat);

  return `/productos?${params.toString()}`;
}

function DropdownMenu() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);

  // Categorías de primer nivel
  const topLevelCategories = Object.keys(categoryMapping);

  // Subcategorías de segundo nivel
  const secondLevelCategories = hoveredCategory
    ? Object.keys(categoryMapping[hoveredCategory]?.subcategories || {})
    : [];

  // Sub-subcategorías de tercer nivel
  const thirdLevelCategories =
    hoveredCategory && hoveredSubCategory
      ? Object.keys(
          categoryMapping[hoveredCategory]?.subcategories[hoveredSubCategory]
            ?.subcategories || {}
        )
      : [];

  // Cuando el mouse sale del área principal, resetea
  const handleMenuMouseLeave = () => {
    setHoveredCategory(null);
    setHoveredSubCategory(null);
  };

  return (
    <div className="mega-menu" onMouseLeave={handleMenuMouseLeave}>
      {/* Columna 1 (Categorías principales) */}
      <div className="mega-menu-column">
        <h6 className="mega-menu-column-title">Categorías</h6>
        {topLevelCategories.map((cat) => (
          <div
            key={cat}
            className={`mega-menu-item ${
              hoveredCategory === cat ? "active" : ""
            }`}
            onMouseEnter={() => {
              setHoveredCategory(cat);
              setHoveredSubCategory(null);
            }}
          >
            {/* Pasa solo la categoría para resetear subcategorías */}
            <Link to={buildCategoryQuery(cat)}>
              {cat}
            </Link>
          </div>
        ))}
      </div>

      {/* Columna 2 (Subcategorías) */}
      {hoveredCategory && secondLevelCategories.length > 0 && (
        <div className="mega-menu-column">
          <h6 className="mega-menu-column-title">Subcategorías</h6>
          {secondLevelCategories.map((subCat) => (
            <div
              key={subCat}
              className={`mega-menu-item ${
                hoveredSubCategory === subCat ? "active" : ""
              }`}
              onMouseEnter={() => setHoveredSubCategory(subCat)}
            >
              {/* Pasa categoría y subcategoría, sin sub-sub para resetear */}
              <Link to={buildCategoryQuery(hoveredCategory, subCat)}>
                {subCat}
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Columna 3 (Sub-subcategorías) */}
      {hoveredSubCategory && thirdLevelCategories.length > 0 && (
        <div className="mega-menu-column">
          <h6 className="mega-menu-column-title">Más específico</h6>
          {thirdLevelCategories.map((thirdCat) => (
            <div key={thirdCat} className="mega-menu-item">
              <Link
                to={buildCategoryQuery(hoveredCategory, hoveredSubCategory, thirdCat)}
              >
                {thirdCat}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;




