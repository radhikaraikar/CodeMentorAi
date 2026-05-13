export const APP_NAME = 'CodeMentor AI';
export const APP_TAGLINE = 'AI-Based Code Explainer for Students';

export const STORAGE_KEYS = {
  HISTORY: 'codementor_history',
  FAVORITES: 'codementor_favorites',
};

export const DEFAULT_CODE = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55`,

  python: `# Python Example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # Output: 55`,

  java: `// Java Example
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10)); // Output: 55
    }
}`,

  cpp: `// C++ Example
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << fibonacci(10) << endl; // Output: 55
    return 0;
}`,

  c: `// C Example
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("%d\\n", fibonacci(10)); // Output: 55
    return 0;
}`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to CodeMentor AI</p>
</body>
</html>`,

  css: `/* CSS Example */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}`,

  sql: `-- SQL Example
SELECT 
    students.name,
    students.grade,
    courses.course_name
FROM students
INNER JOIN enrollments ON students.id = enrollments.student_id
INNER JOIN courses ON enrollments.course_id = courses.id
WHERE students.grade >= 'B'
ORDER BY students.name ASC;`,
};

export const OPTIMIZATION_TYPES = [
  { label: 'Performance', value: 'performance' },
  { label: 'Readability', value: 'readability' },
  { label: 'Memory Usage', value: 'memory' },
  { label: 'Best Practices', value: 'best-practices' },
];

export const DIFFICULTY_LEVELS = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export const ACTION_TYPES = {
  EXPLAIN: 'explain',
  DEBUG: 'debug',
  OPTIMIZE: 'optimize',
  VIVA: 'viva',
};
