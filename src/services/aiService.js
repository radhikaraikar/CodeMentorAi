import axios from 'axios';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let runtimeApiKey = '';
let runtimeApiUrl = '';

export const setRuntimeConfig = (key, url) => {
  runtimeApiKey = key || '';
  runtimeApiUrl = url || '';
};

export const getRuntimeKey = () =>
  runtimeApiKey || import.meta.env.VITE_AI_API_KEY || '';

const getConfig = () => {
  const API_KEY = runtimeApiKey || import.meta.env.VITE_AI_API_KEY || '';
  const API_URL =
    runtimeApiUrl ||
    import.meta.env.VITE_AI_API_URL ||
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  return { API_KEY, API_URL };
};

// ─── Demo responses when API is unavailable ───────────────────────────────────
const getDemoExplanation = (code, language) => `## 1. Simple Summary
This is a **demo response** (API quota exceeded). Below is a sample explanation for your ${language} code.

The code defines a recursive \`fibonacci\` function that calculates the nth Fibonacci number. It uses a base case to stop recursion and returns the sum of the two previous Fibonacci numbers.

## 2. Line-by-Line Explanation

\`\`\`${language}
${code}
\`\`\`

- **Line 1-2**: Defines the function/method with parameter \`n\`
- **Line 3**: Base case — if \`n\` is 0 or 1, return \`n\` directly
- **Line 4**: Recursive case — returns \`fibonacci(n-1) + fibonacci(n-2)\`
- **Last line**: Calls the function and prints the result

## 3. Important Concepts Used

- **Recursion**: The function calls itself with smaller inputs
- **Base Case**: Prevents infinite recursion (when n ≤ 1)
- **Call Stack**: Each recursive call is added to the call stack
- **Return Statement**: Passes values back up the call chain

## 4. Input and Output Explanation

- **Input**: An integer \`n\` (e.g., 10)
- **Output**: The nth Fibonacci number (e.g., fibonacci(10) = 55)
- **Example**: fibonacci(0)=0, fibonacci(1)=1, fibonacci(5)=5, fibonacci(10)=55

## 5. Time Complexity

**O(2^n)** — Exponential time complexity because each call branches into two more calls, creating a binary tree of calls with depth n.

## 6. Space Complexity

**O(n)** — Linear space due to the call stack depth. At most n recursive calls are active at once.

## 7. Possible Errors

- **Stack Overflow**: For very large \`n\` (e.g., n > 10000), the recursion depth exceeds the stack limit
- **Negative Input**: No handling for negative numbers — will cause infinite recursion
- **Non-integer Input**: Passing a float or string will cause unexpected behavior

## 8. Viva Questions with Answers

**Q1: What is the base case in this recursive function?**
**Answer:** The base case is \`if (n <= 1) return n\`. It stops recursion when n is 0 or 1.

**Q2: What is the time complexity and why?**
**Answer:** O(2^n) because each call makes two more calls, doubling the work at each level.

**Q3: How can you optimize this function?**
**Answer:** Use memoization (dynamic programming) to cache results, reducing time to O(n).

**Q4: What happens if you call fibonacci(-1)?**
**Answer:** It causes infinite recursion and eventually a stack overflow error.

**Q5: What is the 10th Fibonacci number?**
**Answer:** 55. The sequence is: 0,1,1,2,3,5,8,13,21,34,55.

---
> ⚠️ **This is a demo response.** To get real AI explanations, create a fresh API key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) and enter it via the ⚙️ Settings button.`;

const getDemoDebug = (code, language) => `## 1. Error Summary
**Demo response** — Your ${language} code has been analyzed. Here is a sample debug report.

The code contains an **off-by-one error** in the loop condition (\`i <= arr.length\` should be \`i < arr.length\`), which causes an \`ArrayIndexOutOfBoundsException\` or \`undefined\` access on the last iteration.

## 2. Syntax Errors
No syntax errors found. The code is syntactically valid.

## 3. Logical Errors
- **Line with loop**: \`i <= arr.length\` should be \`i < arr.length\`
  - Arrays are 0-indexed, so valid indices are 0 to length-1
  - Using \`<=\` accesses index \`length\` which doesn't exist

## 4. Why the Error Occurs
Array indices start at 0. For an array of 5 elements, valid indices are 0,1,2,3,4. Using \`<= arr.length\` tries to access index 5, which is undefined/out of bounds.

## 5. Corrected Code
\`\`\`${language}
// Fixed: changed <= to <
for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
}
\`\`\`

## 6. Explanation of Fixes
Changed \`i <= arr.length\` to \`i < arr.length\` to prevent accessing the non-existent last index.

## 7. Tips to Avoid This Error
- Always use \`i < array.length\` (not \`<=\`) in array loops
- Use enhanced for-loops when you don't need the index
- Add input validation to check for empty arrays

---
> ⚠️ **Demo response.** Enter a valid API key in ⚙️ Settings for real AI debugging.`;

const getDemoOptimize = (code, language) => `## 1. Optimized Code
\`\`\`${language}
// Optimized using memoization (Dynamic Programming)
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
console.log(fibonacci(10)); // Output: 55
\`\`\`

## 2. Explanation of Improvements
Added a \`memo\` object to cache previously computed results, eliminating redundant recursive calls.

## 3. Before vs After Comparison
| Aspect | Before | After |
|--------|--------|-------|
| Approach | Pure recursion | Memoized recursion |
| Repeated work | Yes (exponential) | No (each value computed once) |
| Memory | O(n) stack | O(n) stack + O(n) cache |

## 4. Time Complexity Before
**O(2^n)** — Each call branches into two more calls exponentially.

## 5. Time Complexity After
**O(n)** — Each Fibonacci number is computed exactly once and cached.

## 6. Space Complexity Before
**O(n)** — Call stack depth equals n.

## 7. Space Complexity After
**O(n)** — Call stack + memo cache, both O(n).

## 8. Best Practice Suggestions
- Use iterative approach for even better space: O(1) space with two variables
- Consider using BigInt for large n values
- Add input validation for negative numbers

---
> ⚠️ **Demo response.** Enter a valid API key in ⚙️ Settings for real AI optimization.`;

const getDemoViva = (code, language) => `## 1. Viva Questions and Answers

**Q1: What does this ${language} code do?**
**Answer:** It calculates the nth Fibonacci number using recursion. The Fibonacci sequence is 0,1,1,2,3,5,8,13,21,34,55...

**Q2: What is recursion?**
**Answer:** Recursion is when a function calls itself with a smaller input until it reaches a base case. It breaks a problem into smaller subproblems.

**Q3: What is the base case here and why is it important?**
**Answer:** \`if (n <= 1) return n\`. Without it, the function would call itself forever causing a stack overflow.

**Q4: What is the time complexity of this code?**
**Answer:** O(2^n) — exponential. Each call makes 2 more calls, creating a binary tree of depth n.

**Q5: How would you optimize this code?**
**Answer:** Use memoization to cache results, reducing time complexity from O(2^n) to O(n).

**Q6: What is the space complexity?**
**Answer:** O(n) due to the call stack. At most n frames are on the stack at any time.

**Q7: What happens for fibonacci(0) and fibonacci(1)?**
**Answer:** Both return their input directly (0 and 1 respectively) — these are the base cases.

**Q8: Can this code handle negative numbers?**
**Answer:** No. Negative input causes infinite recursion and a stack overflow error.

**Q9: What is the difference between recursion and iteration?**
**Answer:** Recursion uses function calls and a call stack; iteration uses loops. Iteration is generally more memory-efficient.

**Q10: What is memoization?**
**Answer:** Storing the results of expensive function calls and returning the cached result when the same inputs occur again.

## 2. Important Concepts from Code
- **Recursion** and **base cases**
- **Call stack** and **stack frames**
- **Fibonacci sequence** mathematics
- **Time and space complexity** analysis

## 3. Possible Follow-up Questions
1. How would you implement this iteratively?
2. What is tail recursion and does this qualify?
3. How does the call stack look for fibonacci(4)?
4. What is dynamic programming and how does it apply here?
5. What is the golden ratio's connection to Fibonacci?

## 4. Key Points to Remember
- Base case: n ≤ 1 returns n
- Recursive case: f(n) = f(n-1) + f(n-2)
- Time: O(2^n), Space: O(n)
- Can be optimized to O(n) time with memoization

---
> ⚠️ **Demo response.** Enter a valid API key in ⚙️ Settings for real AI-generated questions.`;

// ─── Main API caller ──────────────────────────────────────────────────────────
const callGeminiAPI = async (prompt, retries = 2) => {
  const { API_KEY, API_URL } = getConfig();

  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error('NO_KEY');
  }

  const url = `${API_URL}?key=${API_KEY}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        url,
        {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        },
        { timeout: 30000, headers: { 'Content-Type': 'application/json' } }
      );

      const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from AI.');
      return text;

    } catch (err) {
      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.error?.message || '';

      if (status === 429) {
        if (attempt < retries) {
          await sleep(5000);
          continue;
        }
        throw new Error('QUOTA_EXCEEDED');
      }
      if (status === 400) throw new Error(`Bad request: ${apiMsg}`);
      if (status === 401 || status === 403) throw new Error(`Invalid API key: ${apiMsg}`);
      if (status === 404) throw new Error(`Model not found: ${apiMsg}`);
      if (err.code === 'ECONNABORTED' || err.message?.includes('timeout'))
        throw new Error('Request timed out. Check your internet connection.');
      if (!err.response) throw err;
      throw new Error(`API error ${status}: ${apiMsg}`);
    }
  }
};

// ─── Public functions ─────────────────────────────────────────────────────────
export const explainCode = async (code, language) => {
  if (!code?.trim()) throw new Error('Please enter some code to explain.');
  try {
    return await callGeminiAPI(
      `You are an expert programming teacher. Explain this ${language} code for a beginner.

Code:
\`\`\`${language}
${code}
\`\`\`

Use this exact markdown structure:

## 1. Simple Summary
## 2. Line-by-Line Explanation
## 3. Important Concepts Used
## 4. Input and Output Explanation
## 5. Time Complexity
## 6. Space Complexity
## 7. Possible Errors
## 8. Viva Questions with Answers (5 questions)`
    );
  } catch (err) {
    if (err.message === 'QUOTA_EXCEEDED' || err.message === 'NO_KEY') {
      return getDemoExplanation(code, language);
    }
    throw err;
  }
};

export const debugCode = async (code, language) => {
  if (!code?.trim()) throw new Error('Please enter some code to debug.');
  try {
    return await callGeminiAPI(
      `You are an expert debugger. Debug this ${language} code.

Code:
\`\`\`${language}
${code}
\`\`\`

Use this exact markdown structure:

## 1. Error Summary
## 2. Syntax Errors
## 3. Logical Errors
## 4. Why the Error Occurs
## 5. Corrected Code
## 6. Explanation of Fixes
## 7. Tips to Avoid This Error`
    );
  } catch (err) {
    if (err.message === 'QUOTA_EXCEEDED' || err.message === 'NO_KEY') {
      return getDemoDebug(code, language);
    }
    throw err;
  }
};

export const optimizeCode = async (code, language, optimizationType = 'performance') => {
  if (!code?.trim()) throw new Error('Please enter some code to optimize.');
  try {
    return await callGeminiAPI(
      `You are an expert software engineer. Optimize this ${language} code for ${optimizationType}.

Code:
\`\`\`${language}
${code}
\`\`\`

Use this exact markdown structure:

## 1. Optimized Code
## 2. Explanation of Improvements
## 3. Before vs After Comparison
## 4. Time Complexity Before
## 5. Time Complexity After
## 6. Space Complexity Before
## 7. Space Complexity After
## 8. Best Practice Suggestions`
    );
  } catch (err) {
    if (err.message === 'QUOTA_EXCEEDED' || err.message === 'NO_KEY') {
      return getDemoOptimize(code, language);
    }
    throw err;
  }
};

export const generateVivaQuestions = async (code, language, difficulty = 'intermediate') => {
  if (!code?.trim()) throw new Error('Please enter some code to generate questions from.');
  try {
    return await callGeminiAPI(
      `You are a programming viva examiner. Generate ${difficulty}-level questions from this ${language} code.

Code:
\`\`\`${language}
${code}
\`\`\`

Use this exact markdown structure:

## 1. Viva Questions and Answers (10 questions, format: **Q1:** ... **Answer:** ...)
## 2. Important Concepts from Code
## 3. Possible Follow-up Questions
## 4. Key Points to Remember`
    );
  } catch (err) {
    if (err.message === 'QUOTA_EXCEEDED' || err.message === 'NO_KEY') {
      return getDemoViva(code, language);
    }
    throw err;
  }
};
