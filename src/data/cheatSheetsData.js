/**
 * Data Science Cheat Sheet Reference Dataset
 * Synthesized from student reference materials shared by Sarah Cox
 * and distributed by Prof. Jade Cao at Central Carolina Community College (CCCC).
 *
 * Covers:
 * 1. NumPy Basics (Arrays, Math, Slicing, Aggregation)
 * 2. Matplotlib 3.10 (Figure Anatomy, Plot Types, Customization)
 * 3. SciPy Linear Algebra (Matrices, Inverses, Solvers Ax=b, Eig, SVD)
 */

export const CHEAT_SHEETS_DATA = {
  numpy: {
    id: 'numpy',
    name: 'NumPy',
    title_en: 'NumPy: Fast Multidimensional Arrays & Vectorized Math',
    title_es: 'NumPy: Arreglos Multidimensionales Rápidos y Matemática Vectorizada',
    badge: 'v1.26+',
    icon: '🧮',
    summary_en: 'The core library for scientific computing in Python, providing n-dimensional arrays (ndarray) with C-speed operations.',
    summary_es: 'La biblioteca fundamental para computación científica en Python, que proporciona arreglos n-dimensionales (ndarray) con operaciones a velocidad de C.',
    sections: [
      {
        id: 'np-creation',
        title_en: 'Array Creation',
        title_es: 'Creación de Arreglos',
        items: [
          {
            id: 'np-create-basic',
            name: 'np.array()',
            desc_en: 'Convert standard Python lists or nested lists into 1D or 2D NumPy ndarrays.',
            desc_es: 'Convierte listas estándar de Python o listas anidadas en ndarrays de NumPy de 1D o 2D.',
            code: `import numpy as np

# 1D vector
a = np.array([1, 2, 3, 4])
print("1D Array:", a)

# 2D matrix (rows x cols)
b = np.array([[1.5, 2.0, 3.5], [4.0, 5.5, 6.0]])
print("2D Array:\\n", b)`,
            tags: ['array', 'create', 'vector', 'matrix', '1d', '2d', 'list']
          },
          {
            id: 'np-create-zeros-ones',
            name: 'np.zeros(), np.ones(), np.full()',
            desc_en: 'Initialize arrays pre-filled with 0, 1, or any constant scalar value.',
            desc_es: 'Inicializa arreglos precargados con 0, 1 o cualquier valor escalar constante.',
            code: `import numpy as np

zeros = np.zeros((2, 3))       # 2 rows, 3 columns of 0.0
ones = np.ones((3, 2))         # 3 rows, 2 columns of 1.0
sevens = np.full((2, 2), 7)    # 2x2 matrix filled with 7

print("Zeros:\\n", zeros)
print("Sevens:\\n", sevens)`,
            tags: ['zeros', 'ones', 'full', 'initialize', 'matrix']
          },
          {
            id: 'np-create-sequences',
            name: 'np.arange() & np.linspace()',
            desc_en: 'Generate evenly spaced numbers over intervals by step size (arange) or total point count (linspace).',
            desc_es: 'Genera números espaciados uniformemente en intervalos por tamaño de paso (arange) o conteo total de puntos (linspace).',
            code: `import numpy as np

# arange(start, stop, step) - step-based
seq = np.arange(10, 26, 5)
print("arange (step=5):", seq)

# linspace(start, stop, num_points) - endpoint inclusive
pts = np.linspace(0, 1, 5)
print("linspace (5 points):", pts)`,
            tags: ['arange', 'linspace', 'sequence', 'range', 'interval']
          },
          {
            id: 'np-create-identity-random',
            name: 'np.eye() & np.random.random()',
            desc_en: 'Create square identity matrices with diagonal 1s, or fill arrays with uniform random floats in [0.0, 1.0).',
            desc_es: 'Crea matrices identidad cuadradas con 1s en la diagonal, o llena arreglos con flotantes aleatorios uniformes en [0.0, 1.0).',
            code: `import numpy as np

eye_mat = np.eye(3)                  # 3x3 identity matrix
rand_mat = np.random.random((2, 3))  # 2x3 random floats [0, 1)

print("3x3 Identity Matrix:\\n", eye_mat)
print("2x3 Random Matrix:\\n", rand_mat)`,
            tags: ['eye', 'identity', 'random', 'matrix', 'diagonal']
          }
        ]
      },
      {
        id: 'np-inspection',
        title_en: 'Array Inspection & Attributes',
        title_es: 'Inspección de Arreglos y Atributos',
        items: [
          {
            id: 'np-inspect-attrs',
            name: '.shape, .ndim, .size, .dtype',
            desc_en: 'Query array dimensions, number of axes, total elements count, and underlying memory data type.',
            desc_es: 'Consulta las dimensiones del arreglo, número de ejes, total de elementos y tipo de dato en memoria.',
            code: `import numpy as np

mat = np.array([[10, 20, 30], [40, 50, 60]], dtype=np.float64)

print("Shape (rows, cols):", mat.shape) # (2, 3)
print("Axes / Dimensions: ", mat.ndim)  # 2
print("Total Elements:    ", mat.size)  # 6
print("Data Type:         ", mat.dtype) # float64`,
            tags: ['shape', 'ndim', 'size', 'dtype', 'inspect', 'attributes', 'type']
          },
          {
            id: 'np-inspect-astype',
            name: '.astype()',
            desc_en: 'Cast array elements to another data type (e.g. float to int, or int to boolean).',
            desc_es: 'Convierte los elementos del arreglo a otro tipo de datos (por ejemplo, float a int, o int a booleano).',
            code: `import numpy as np

floats = np.array([1.2, 2.7, 3.9])
integers = floats.astype(int)

print("Original floats:", floats)
print("Cast to ints:   ", integers)`,
            tags: ['astype', 'cast', 'convert', 'type', 'dtype']
          }
        ]
      },
      {
        id: 'np-arithmetic',
        title_en: 'Vectorized Arithmetic & Universal Functions',
        title_es: 'Aritmética Vectorizada y Funciones Universales',
        items: [
          {
            id: 'np-elementwise-ops',
            name: 'Element-wise Operators (+, -, *, /, **)',
            desc_en: 'Execute ultra-fast vectorized arithmetic without writing Python for-loops. Operations apply element by element.',
            desc_es: 'Ejecuta aritmética vectorizada ultrarrápida sin escribir bucles for en Python. Las operaciones se aplican elemento por elemento.',
            code: `import numpy as np

a = np.array([10, 20, 30, 40])
b = np.array([1, 2, 3, 4])

print("Addition (a + b):      ", a + b)
print("Subtraction (a - b):   ", a - b)
print("Multiplication (a * b):", a * b)
print("Division (a / b):      ", a / b)
print("Exponent (b ** 2):     ", b ** 2)`,
            tags: ['arithmetic', 'vectorized', 'add', 'subtract', 'multiply', 'divide', 'elementwise']
          },
          {
            id: 'np-ufuncs',
            name: 'np.exp(), np.sqrt(), np.sin(), np.log()',
            desc_en: 'Apply mathematical and trigonometric functions simultaneously across all array cells in compiled C speed.',
            desc_es: 'Aplica funciones matemáticas y trigonométricas simultáneamente a todas las celdas del arreglo a velocidad de C.',
            code: `import numpy as np

angles = np.array([0, np.pi / 2, np.pi])
print("Sine values:       ", np.sin(angles))

values = np.array([1, 4, 9, 16])
print("Square roots:      ", np.sqrt(values))
print("Natural logarithms:", np.log(values))`,
            tags: ['sqrt', 'sin', 'cos', 'exp', 'log', 'ufunc', 'math']
          },
          {
            id: 'np-dot-product',
            name: 'Matrix Multiplication (np.dot() & @)',
            desc_en: 'Compute vector dot products or 2D matrix multiplications using np.dot() or the @ operator.',
            desc_es: 'Calcula productos punto de vectores o multiplicaciones de matrices 2D usando np.dot() o el operador @.',
            code: `import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[2, 0], [1, 2]])

# Standard matrix multiplication
result = A @ B
print("Matrix Product (A @ B):\\n", result)

# Vector dot product
v1 = np.array([1, 3])
v2 = np.array([4, -1])
print("Dot Product:", np.dot(v1, v2)) # 1*4 + 3*(-1) = 1`,
            tags: ['dot', 'matmul', 'matrix', '@', 'multiply', 'linear algebra']
          }
        ]
      },
      {
        id: 'np-indexing',
        title_en: 'Subsetting, Slicing & Boolean Indexing',
        title_es: 'Subconjuntos, Rebanado e Indexación Booleana',
        items: [
          {
            id: 'np-slice-2d',
            name: '2D Slicing: arr[row_slice, col_slice]',
            desc_en: 'Extract subsets of rows and columns using [start:stop:step] slice syntax.',
            desc_es: 'Extrae subconjuntos de filas y columnas utilizando la sintaxis de rebanado [start:stop:step].',
            code: `import numpy as np

mat = np.array([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
    [30, 31, 32, 33]
])

print("Row 0, Col 2:       ", mat[0, 2])
print("First 2 rows, cols 1-2:\\n", mat[0:2, 1:3])
print("All rows, last col: ", mat[:, -1])`,
            tags: ['slice', 'indexing', 'subset', '2d', 'row', 'column']
          },
          {
            id: 'np-boolean-masking',
            name: 'Boolean Masking: arr[condition]',
            desc_en: 'Filter array values using boolean conditional expressions without manual looping.',
            desc_es: 'Filtra valores del arreglo mediante expresiones condicionales booleanas sin bucles manuales.',
            code: `import numpy as np

data = np.array([12, 45, 68, 23, 89, 5, 99])

# Create a boolean mask where condition is True
mask = data > 40
print("Mask:          ", mask)
print("Filtered items:", data[mask])`,
            tags: ['boolean', 'mask', 'filter', 'conditional', 'indexing']
          }
        ]
      },
      {
        id: 'np-aggregations',
        title_en: 'Aggregates & Summary Statistics',
        title_es: 'Agregaciones y Estadísticas de Resumen',
        items: [
          {
            id: 'np-agg-basic',
            name: '.sum(), .mean(), .std(), .min(), .max()',
            desc_en: 'Compute descriptive statistics across the entire array or along a designated axis (axis=0 for columns, axis=1 for rows).',
            desc_es: 'Calcula estadísticas descriptivas sobre todo el arreglo o a lo largo de un eje específico (axis=0 columnas, axis=1 filas).',
            code: `import numpy as np

grid = np.array([[10, 20], [30, 40]])

print("Overall Sum: ", grid.sum())
print("Column Means (axis=0):", grid.mean(axis=0)) # [20., 30.]
print("Row Maxima   (axis=1):", grid.max(axis=1))  # [20, 40]
print("Std Deviation:        ", np.std(grid))`,
            tags: ['sum', 'mean', 'std', 'min', 'max', 'axis', 'aggregate', 'stats']
          },
          {
            id: 'np-reshape-transpose',
            name: '.reshape(), .T, .ravel()',
            desc_en: 'Change the dimensions of an array without changing its data elements.',
            desc_es: 'Cambia las dimensiones de un arreglo sin modificar sus elementos de datos.',
            code: `import numpy as np

orig = np.arange(1, 7) # [1, 2, 3, 4, 5, 6]
reshaped = orig.reshape((2, 3))
print("Reshaped 2x3:\\n", reshaped)
print("Transposed (.T):\\n", reshaped.T)
print("Flattened (.ravel()):", reshaped.ravel())`,
            tags: ['reshape', 'transpose', 'ravel', 'flatten', 'dimension']
          }
        ]
      }
    ]
  },

  matplotlib: {
    id: 'matplotlib',
    name: 'Matplotlib',
    title_en: 'Matplotlib 3.10: Data Visualization & Figure Anatomy',
    title_es: 'Matplotlib 3.10: Visualización de Datos y Anatomía de Figuras',
    badge: 'v3.10+',
    icon: '📈',
    summary_en: 'Comprehensive 2D data plotting library in Python using the modern Object-Oriented (fig, ax) API.',
    summary_es: 'Biblioteca integral de gráficos 2D en Python mediante la moderna API orientada a objetos (fig, ax).',
    sections: [
      {
        id: 'mpl-anatomy',
        title_en: 'Figure Anatomy & Object-Oriented Quick Start',
        title_es: 'Anatomía de la Figura e Inicio Rápido Orientado a Objetos',
        items: [
          {
            id: 'mpl-quickstart',
            name: 'fig, ax = plt.subplots()',
            desc_en: 'The recommended object-oriented starting pattern. Creates a Figure container and an Axes plotting canvas.',
            desc_es: 'El patrón inicial orientado a objetos recomendado. Crea un contenedor Figure y un lienzo de trazado Axes.',
            code: `import matplotlib.pyplot as plt
import numpy as np

# 1. Create Figure and Axes
fig, ax = plt.subplots(figsize=(6, 4))

# 2. Prepare Data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 3. Plot on the Axes
ax.plot(x, y, color='teal', linewidth=2, label='sin(x)')

# 4. Decorate & Label
ax.set_title("Sine Wave Oscillation", fontsize=12)
ax.set_xlabel("Time (seconds)")
ax.set_ylabel("Amplitude")
ax.grid(True, linestyle='--', alpha=0.6)
ax.legend()

plt.show()`,
            tags: ['figure', 'axes', 'subplots', 'quickstart', 'oo', 'canvas']
          },
          {
            id: 'mpl-anatomy-explanation',
            name: 'Anatomy: Figure vs Axes vs Axis',
            desc_en: 'Understanding the 3-tier hierarchy: Figure (whole window/page), Axes (individual plot area with coordinate system), Axis (x/y number lines with ticks).',
            desc_es: 'Comprensión de la jerarquía de 3 niveles: Figure (ventana/página completa), Axes (área de gráfico individual), Axis (líneas de números x/y con marcas).',
            code: `# Matplotlib Figure Anatomy Reference:
# - Figure: The top-level canvas that holds all elements
# - Axes: The actual plot/chart box (a Figure can hold multiple Axes)
# - Axis: The x-axis and y-axis lines, scales, limits, and tick marks
# - Spines: The four bounding border lines of the plot area
# - Ticks & Tick Labels: Major and minor notch marks and number values`,
            tags: ['anatomy', 'figure', 'axes', 'axis', 'spines', 'ticks', 'theory']
          }
        ]
      },
      {
        id: 'mpl-plot-types',
        title_en: 'Core Plot Types & Visualizations',
        title_es: 'Tipos Principales de Gráficos y Visualizaciones',
        items: [
          {
            id: 'mpl-scatter',
            name: 'Scatter Plot (ax.scatter)',
            desc_en: 'Display individual data points with custom colors, sizes, and transparency to visualize correlations.',
            desc_es: 'Muestra puntos de datos individuales con colores, tamaños y transparencia personalizados para visualizar correlaciones.',
            code: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.randn(50)
y = 2 * x + np.random.randn(50)
sizes = np.random.randint(20, 150, 50)

fig, ax = plt.subplots()
scatter = ax.scatter(x, y, s=sizes, c=y, cmap='viridis', alpha=0.75, edgecolors='none')
ax.set_title("Scatter Plot with Color Mapping")
fig.colorbar(scatter, ax=ax, label="Y Intensity")
plt.show()`,
            tags: ['scatter', 'points', 'correlation', 'cmap', 'viridis', 'bubble']
          },
          {
            id: 'mpl-bar',
            name: 'Bar Charts (ax.bar & ax.barh)',
            desc_en: 'Compare categorical quantities using vertical (ax.bar) or horizontal (ax.barh) bars.',
            desc_es: 'Compara cantidades categóricas utilizando barras verticales (ax.bar) u horizontales (ax.barh).',
            code: `import matplotlib.pyplot as plt

categories = ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5']
scores = [92, 85, 78, 88, 95]

fig, ax = plt.subplots(figsize=(6, 3.5))
bars = ax.bar(categories, scores, color=['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'])
ax.set_ylim(0, 100)
ax.set_ylabel("Average Score (%)")
ax.set_title("Student Mastery by Module")

# Add text labels on top of bars
for bar in bars:
    yval = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2, yval + 1.5, f"{yval}%", ha='center', fontsize=9)

plt.tight_layout()
plt.show()`,
            tags: ['bar', 'categorical', 'comparison', 'barh', 'chart']
          },
          {
            id: 'mpl-hist',
            name: 'Histogram (ax.hist)',
            desc_en: 'Visualize the underlying probability distribution and frequency distribution of continuous numerical data.',
            desc_es: 'Visualiza la distribución de probabilidad subyacente y frecuencia de datos numéricos continuos.',
            code: `import matplotlib.pyplot as plt
import numpy as np

# Generate normally distributed data (mean=70, std=10)
exam_scores = np.random.normal(70, 10, 200)

fig, ax = plt.subplots()
n, bins, patches = ax.hist(exam_scores, bins=15, color='#6366f1', edgecolor='black', alpha=0.7)
ax.set_title("Exam Score Distribution")
ax.set_xlabel("Score")
ax.set_ylabel("Student Count")
plt.show()`,
            tags: ['hist', 'histogram', 'distribution', 'frequency', 'bins', 'normal']
          }
        ]
      },
      {
        id: 'mpl-layouts-saving',
        title_en: 'Subplot Grids & Figure Export',
        title_es: 'Cuadrículas de Subgráficos y Exportación',
        items: [
          {
            id: 'mpl-multi-subplots',
            name: 'Multi-Panel Grids (plt.subplots(nrows, ncols))',
            desc_en: 'Create multi-panel dashboards in a single figure window with 2D subplot indexing.',
            desc_es: 'Crea paneles múltiples en una sola ventana de figura con indexación de subgráficos 2D.',
            code: `import matplotlib.pyplot as plt
import numpy as np

fig, axs = plt.subplots(2, 2, figsize=(7, 5))
x = np.linspace(0, 5, 50)

axs[0, 0].plot(x, x, color='blue')
axs[0, 0].set_title("Linear")

axs[0, 1].plot(x, x**2, color='green')
axs[0, 1].set_title("Quadratic")

axs[1, 0].plot(x, np.exp(x), color='red')
axs[1, 0].set_title("Exponential")

axs[1, 1].plot(x, np.sin(x), color='purple')
axs[1, 1].set_title("Sine")

plt.tight_layout() # Prevent overlapping titles and axis labels
plt.show()`,
            tags: ['subplots', 'grid', 'multi', 'dashboard', 'tight_layout']
          },
          {
            id: 'mpl-savefig',
            name: 'Exporting Figures (fig.savefig)',
            desc_en: 'Save vector or high-resolution raster images (PNG, PDF, SVG) with transparent backgrounds.',
            desc_es: 'Guarda imágenes vectoriales o ráster de alta resolución (PNG, PDF, SVG) con fondos transparentes.',
            code: `import matplotlib.pyplot as plt

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [4, 5, 6])

# Export high-res PNG or vector PDF
fig.savefig("high_res_plot.png", dpi=300, bbox_inches='tight')
fig.savefig("vector_plot.pdf", bbox_inches='tight')
print("Saved successfully!")`,
            tags: ['savefig', 'export', 'save', 'png', 'pdf', 'dpi']
          }
        ]
      }
    ]
  },

  scipy: {
    id: 'scipy',
    name: 'SciPy',
    title_en: 'SciPy: Computational Linear Algebra (scipy.linalg)',
    title_es: 'SciPy: Álgebra Lineal Computacional (scipy.linalg)',
    badge: 'v1.12+',
    icon: '🔬',
    summary_en: 'The standard Python scientific library for linear algebra, system solvers (Ax = b), matrix decompositions, eigenvalues, and SVD.',
    summary_es: 'La biblioteca científica estándar de Python para álgebra lineal, solucionadores de sistemas (Ax = b), descomposiciones matriciales, autovalores y SVD.',
    sections: [
      {
        id: 'sp-matrix-basics',
        title_en: 'Matrix Inversion, Determinants & Norms',
        title_es: 'Inversión de Matrices, Determinantes y Normas',
        items: [
          {
            id: 'sp-inv-det',
            name: 'linalg.inv() & linalg.det()',
            desc_en: 'Compute the inverse matrix A⁻¹ such that A · A⁻¹ = I, and calculate the matrix determinant |A|.',
            desc_es: 'Calcula la matriz inversa A⁻¹ tal que A · A⁻¹ = I, y obtiene el determinante matricial |A|.',
            code: `import numpy as np
from scipy import linalg

A = np.array([[1, 2], [3, 4]])

# Determinant: ad - bc = 1*4 - 2*3 = -2
det_A = linalg.det(A)
print("Determinant |A|:", det_A)

# Inverse matrix
A_inv = linalg.inv(A)
print("Inverse Matrix A^-1:\\n", A_inv)

# Verify identity: A @ A^-1 = I
identity_check = np.allclose(A @ A_inv, np.eye(2))
print("Is A @ A^-1 equal to Identity? ->", identity_check)`,
            tags: ['inverse', 'inv', 'det', 'determinant', 'identity', 'matrix']
          },
          {
            id: 'sp-matrix-norm',
            name: 'linalg.norm()',
            desc_en: 'Compute matrix or vector norms (Frobenius, 1-norm, 2-norm, infinity-norm) to quantify magnitude.',
            desc_es: 'Calcula normas matriciales o vectoriales (Frobenius, norma 1, norma 2, norma infinito) para cuantificar magnitud.',
            code: `import numpy as np
from scipy import linalg

A = np.array([[1, 2], [3, 4]])

print("Frobenius Norm: ", linalg.norm(A))             # default
print("1-Norm (max col sum):", linalg.norm(A, 1))      # 1 + 3 = 4, 2 + 4 = 6 -> 6
print("Inf-Norm (max row sum):", linalg.norm(A, np.inf)) # 1 + 2 = 3, 3 + 4 = 7 -> 7`,
            tags: ['norm', 'magnitude', 'frobenius', 'matrix', 'vector']
          }
        ]
      },
      {
        id: 'sp-solvers',
        title_en: 'Solving Linear Systems (Ax = b)',
        title_es: 'Solución de Sistemas Lineales (Ax = b)',
        items: [
          {
            id: 'sp-solve-linear',
            name: 'linalg.solve(A, b)',
            desc_en: 'Directly and accurately solves square systems of linear equations Ax = b via LAPACK LU decomposition.',
            desc_es: 'Resuelve de manera directa y precisa sistemas cuadrados de ecuaciones lineales Ax = b mediante descomposición LU de LAPACK.',
            code: `import numpy as np
from scipy import linalg

# System of equations:
#   1*x + 2*y = 5
#   3*x + 4*y = 11

A = np.array([[1, 2], [3, 4]])
b = np.array([5, 11])

# Solve for x and y
solution = linalg.solve(A, b)
print("Solution [x, y]:", solution) # [1., 2.]

# Verification: A @ solution == b
print("Verification (A @ x):", A @ solution)`,
            tags: ['solve', 'system', 'equations', 'linear', 'Ax=b', 'solution']
          },
          {
            id: 'sp-least-squares',
            name: 'linalg.lstsq(A, b)',
            desc_en: 'Compute the optimal least-squares solution to an overdetermined linear system (linear regression / line fitting).',
            desc_es: 'Calcula la solución óptima de mínimos cuadrados para un sistema lineal sobredeterminado (regresión lineal / ajuste de línea).',
            code: `import numpy as np
from scipy import linalg

# Overdetermined data points: fit y = m*x + c
# Points: (0, 1), (1, 2.2), (2, 2.9), (3, 4.1)
x = np.array([0, 1, 2, 3])
y = np.array([1.0, 2.2, 2.9, 4.1])

# Design matrix with column of 1s for intercept
A = np.column_stack([x, np.ones(len(x))])

# Solve least-squares: p[0] is slope, p[1] is intercept
p, residues, rank, s = linalg.lstsq(A, y)
print(f"Fitted Line: y = {p[0]:.2f}*x + {p[1]:.2f}")`,
            tags: ['lstsq', 'least squares', 'regression', 'fit', 'linear fit']
          }
        ]
      },
      {
        id: 'sp-decompositions',
        title_en: 'Eigenvalues, SVD & Decompositions',
        title_es: 'Autovalores, SVD y Descomposiciones',
        items: [
          {
            id: 'sp-eigenvalues',
            name: 'linalg.eig(A)',
            desc_en: 'Compute eigenvalues (λ) and right eigenvectors (v) satisfying A · v = λ · v. Fundamental for PCA and stability analysis.',
            desc_es: 'Calcula autovalores (λ) y autovectores derechos (v) que satisfacen A · v = λ · v. Fundamental para PCA y análisis de estabilidad.',
            code: `import numpy as np
from scipy import linalg

A = np.array([[2, 0], [0, 5]])

# Compute eigenvalues and eigenvectors
eigenvalues, eigenvectors = linalg.eig(A)

print("Eigenvalues:         ", eigenvalues.real)
print("Eigenvectors (cols):\\n", eigenvectors)`,
            tags: ['eig', 'eigenvalue', 'eigenvector', 'decomposition', 'matrix']
          },
          {
            id: 'sp-svd',
            name: 'Singular Value Decomposition (linalg.svd)',
            desc_en: 'Factorize matrix A into U · Σ · V^T, decomposing any real matrix into orthogonal rotations and scaling components.',
            desc_es: 'Factoriza la matriz A en U · Σ · V^T, descomponiendo cualquier matriz real en rotaciones ortogonales y componentes de escala.',
            code: `import numpy as np
from scipy import linalg

A = np.array([[1, 2, 3], [4, 5, 6]])

# U (left singular vectors), s (singular values), Vh (right singular vectors transposed)
U, s, Vh = linalg.svd(A)

print("Singular Values (s):", s)
print("Shape of U:         ", U.shape)
print("Shape of Vh:        ", Vh.shape)`,
            tags: ['svd', 'singular value', 'decomposition', 'factorization', 'compression']
          },
          {
            id: 'sp-lu-decomp',
            name: 'LU Decomposition (linalg.lu)',
            desc_en: 'Factorize a square matrix into a Permutation matrix P, Lower triangular L, and Upper triangular U: A = P · L · U.',
            desc_es: 'Factoriza una matriz cuadrada en una matriz de permutación P, triangular inferior L y triangular superior U: A = P · L · U.',
            code: `import numpy as np
from scipy import linalg

A = np.array([[2, 5, 8], [5, 2, 2], [7, 5, 6]])

P, L, U = linalg.lu(A)

print("Permutation Matrix P:\\n", P)
print("Lower Triangular L:\\n", L)
print("Upper Triangular U:\\n", U)

# Reconstruct: P @ L @ U == A
print("Verification (P @ L @ U):\\n", P @ L @ U)`,
            tags: ['lu', 'cholesky', 'decomposition', 'triangular', 'permutation']
          }
        ]
      }
    ]
  }
};
