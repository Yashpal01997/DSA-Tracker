import { useState, useEffect, useRef, useCallback } from "react";

const GOOGLE_CLIENT_ID = "228912926932-ootdea8ak3duntajgacuk4r2n6qe11a1.apps.googleusercontent.com";
const DRIVE_FILE_NAME = "dsa-tracker-progress.json";
const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.appdata";

const LC = "https://leetcode.com/problems/";
const GFG = "https://www.geeksforgeeks.org/";

const ALL_PROBLEMS = [
  // ── PHASE 0: Beginner Guide ──────────────────────────────────────────────
  { id:"b01", phase:0, topic:"Basics: Complexity", subtopic:"Big O & Cases", name:"Analyse Time Complexity of loops & recursion", url:"https://www.bosscoderacademy.com/practice-test/time-space-complexity-mcq-dsa" },
  { id:"b02", phase:0, topic:"Basics: Complexity", subtopic:"Big O & Cases", name:"Identify Worst / Average / Best cases", url:`${GFG}worst-average-and-best-cases/` },
  { id:"b03", phase:0, topic:"Basics: Arrays", subtopic:"Array Fundamentals", name:"Linear Search", url:"https://www.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1" },
  { id:"b04", phase:0, topic:"Basics: Arrays", subtopic:"Array Fundamentals", name:"Binary Search", url:"https://www.geeksforgeeks.org/problems/binary-search-1587115620/1" },
  { id:"b05", phase:0, topic:"Basics: Arrays", subtopic:"Array Fundamentals", name:"Reverse an Array", url:"https://www.geeksforgeeks.org/problems/reverse-an-array/1" },
  { id:"b06", phase:0, topic:"Basics: Arrays", subtopic:"Array Fundamentals", name:"Find Min/Max in Array", url:"https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1" },
  { id:"b07", phase:0, topic:"Basics: Arrays", subtopic:"Array Fundamentals", name:"Basic Prefix Sum", url:"https://www.geeksforgeeks.org/problems/maximum-prefix-sum-for-a-given-range0227/1" },
  { id:"b08", phase:0, topic:"Basics: Linked Lists", subtopic:"LL Fundamentals", name:"Insertion at Tail", url:"https://www.geeksforgeeks.org/problems/linked-list-insertion-1587115620/1" },
  { id:"b09", phase:0, topic:"Basics: Linked Lists", subtopic:"LL Fundamentals", name:"Delete Given Node", url:"https://leetcode.com/problems/delete-node-in-a-linked-list/description/" },
  { id:"b10", phase:0, topic:"Basics: Linked Lists", subtopic:"LL Fundamentals", name:"Reverse a Linked List", url:"https://leetcode.com/problems/reverse-linked-list/description/" },
  { id:"b11", phase:0, topic:"Basics: Linked Lists", subtopic:"LL Fundamentals", name:"Merge Two Sorted Lists (Basics)", url:"https://leetcode.com/problems/merge-two-sorted-lists/description" },
  { id:"b12", phase:0, topic:"Basics: Stack & Queue", subtopic:"Stack", name:"Implement Stack using Array", url:"https://www.geeksforgeeks.org/problems/implement-stack-using-array/1" },
  { id:"b13", phase:0, topic:"Basics: Stack & Queue", subtopic:"Stack", name:"Implement Stack using Linked List", url:"https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1" },
  { id:"b14", phase:0, topic:"Basics: Stack & Queue", subtopic:"Stack", name:"Valid Parentheses (Basics)", url:"https://leetcode.com/problems/valid-parentheses/description" },
  { id:"b15", phase:0, topic:"Basics: Stack & Queue", subtopic:"Stack", name:"Palindrome Linked List (Stack)", url:"https://leetcode.com/problems/palindrome-linked-list/description/" },
  { id:"b16", phase:0, topic:"Basics: Stack & Queue", subtopic:"Queue", name:"Implement Queue using Array", url:"https://www.geeksforgeeks.org/problems/implement-queue-using-array/1" },
  { id:"b17", phase:0, topic:"Basics: Stack & Queue", subtopic:"Queue", name:"Implement Queue using Linked List", url:"https://www.geeksforgeeks.org/problems/implement-queue-using-linked-list/1" },
  { id:"b18", phase:0, topic:"Basics: Stack & Queue", subtopic:"Queue", name:"Number of Recent Calls", url:"https://leetcode.com/problems/number-of-recent-calls/description/" },
  { id:"b19", phase:0, topic:"Basics: Strings", subtopic:"String Fundamentals", name:"Palindrome Check", url:"https://www.geeksforgeeks.org/problems/palindrome-string0817/1" },
  { id:"b20", phase:0, topic:"Basics: Strings", subtopic:"String Fundamentals", name:"Basic String Manipulation", url:"https://www.geeksforgeeks.org/problems/string-manipulation3706/1" },
  { id:"b21", phase:0, topic:"Basics: Strings", subtopic:"String Fundamentals", name:"Reverse String", url:"https://leetcode.com/problems/reverse-string/description/" },
  { id:"b22", phase:0, topic:"Basics: Strings", subtopic:"String Fundamentals", name:"To Lower Case", url:"https://leetcode.com/problems/to-lower-case/description/" },
  { id:"b23", phase:0, topic:"Basics: Searching", subtopic:"Linear Search", name:"Searching in an Array", url:"https://www.geeksforgeeks.org/problems/searching-a-number0324/1" },
  { id:"b24", phase:0, topic:"Basics: Searching", subtopic:"Binary Search", name:"Search in a Sorted Array", url:"https://leetcode.com/problems/binary-search/description/" },
  { id:"b25", phase:0, topic:"Basics: Searching", subtopic:"Binary Search", name:"Missing Number", url:"https://leetcode.com/problems/missing-number/description/" },
  { id:"b26", phase:0, topic:"Basics: Sorting", subtopic:"Sorting Algorithms", name:"Insertion Sort", url:"https://www.geeksforgeeks.org/problems/insertion-sort/1" },
  { id:"b27", phase:0, topic:"Basics: Sorting", subtopic:"Sorting Algorithms", name:"Merge Sort", url:"https://www.geeksforgeeks.org/problems/merge-sort/1" },
  { id:"b28", phase:0, topic:"Basics: Sorting", subtopic:"Sorting Algorithms", name:"Quick Sort", url:"https://www.geeksforgeeks.org/problems/quick-sort/1" },
  { id:"b29", phase:0, topic:"Basics: Sorting", subtopic:"Sorting Algorithms", name:"Selection Sort", url:"https://www.geeksforgeeks.org/problems/selection-sort/1" },
  { id:"b30", phase:0, topic:"Basics: Hashing", subtopic:"Hash Fundamentals", name:"Design HashMap", url:"https://leetcode.com/problems/design-hashmap/description/" },
  { id:"b31", phase:0, topic:"Basics: Hashing", subtopic:"Hash Fundamentals", name:"Design HashSet", url:"https://leetcode.com/problems/design-hashset/description/" },
  { id:"b32", phase:0, topic:"Basics: Recursion", subtopic:"Recursion Fundamentals", name:"Factorial", url:"https://www.geeksforgeeks.org/problems/factorial5739/1" },
  { id:"b33", phase:0, topic:"Basics: Recursion", subtopic:"Recursion Fundamentals", name:"Power of Three", url:"https://leetcode.com/problems/power-of-three/description/" },
  { id:"b34", phase:0, topic:"Basics: Recursion", subtopic:"Recursion Fundamentals", name:"Pow(x, n)", url:"https://leetcode.com/problems/powx-n/description/" },
  { id:"b35", phase:0, topic:"Basics: Recursion", subtopic:"Recursion Fundamentals", name:"Fibonacci Number", url:"https://leetcode.com/problems/fibonacci-number/description/" },
  { id:"b36", phase:0, topic:"Basics: Recursion", subtopic:"Recursion Fundamentals", name:"Unique 3-digit Even Numbers", url:"https://leetcode.com/problems/unique-3-digit-even-numbers/description/" },
  { id:"b37", phase:0, topic:"Basics: Trees", subtopic:"Tree Traversals", name:"Inorder Traversal", url:"https://leetcode.com/problems/binary-tree-inorder-traversal/description/" },
  { id:"b38", phase:0, topic:"Basics: Trees", subtopic:"Tree Traversals", name:"Preorder Traversal", url:"https://leetcode.com/problems/binary-tree-preorder-traversal/description/" },
  { id:"b39", phase:0, topic:"Basics: Trees", subtopic:"Tree Traversals", name:"Postorder Traversal", url:"https://leetcode.com/problems/binary-tree-postorder-traversal/description/" },
  { id:"b40", phase:0, topic:"Basics: Trees", subtopic:"Tree Problems", name:"Same Tree (Basics)", url:"https://leetcode.com/problems/same-tree/description/" },
  { id:"b41", phase:0, topic:"Basics: Trees", subtopic:"Tree Problems", name:"Maximum Depth of Binary Tree (Basics)", url:"https://leetcode.com/problems/maximum-depth-of-binary-tree/description/" },
  { id:"b42", phase:0, topic:"Basics: Trees", subtopic:"Tree Problems", name:"Path Sum (Basics)", url:"https://leetcode.com/problems/path-sum/description/" },
  { id:"b43", phase:0, topic:"Basics: Heap", subtopic:"Heap Fundamentals", name:"Operations on Binary Min Heap", url:"https://www.geeksforgeeks.org/problems/operations-on-binary-min-heap/1" },
  { id:"b44", phase:0, topic:"Basics: Heap", subtopic:"Heap Sort", name:"Heap Sort", url:"https://www.geeksforgeeks.org/problems/heap-sort/1" },
  { id:"b45", phase:0, topic:"Basics: Heap", subtopic:"Heap Sort", name:"Minimum Cost of Ropes", url:"https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1" },
  { id:"b46", phase:0, topic:"Basics: Heap", subtopic:"Heap Sort", name:"Kth Largest Element in a Stream", url:"https://leetcode.com/problems/kth-largest-element-in-a-stream/description/" },
  { id:"b47", phase:0, topic:"Basics: Heap", subtopic:"Heap Sort", name:"Last Stone Weight (Basics)", url:"https://leetcode.com/problems/last-stone-weight/description/" },
  { id:"b48", phase:0, topic:"Basics: Greedy", subtopic:"Greedy Fundamentals", name:"Longest Palindrome (Greedy)", url:"https://leetcode.com/problems/longest-palindrome/description/" },
  { id:"b49", phase:0, topic:"Basics: Greedy", subtopic:"Greedy Fundamentals", name:"Assign Cookies", url:"https://leetcode.com/problems/assign-cookies/description/" },
  { id:"b50", phase:0, topic:"Basics: Greedy", subtopic:"Greedy Fundamentals", name:"Array Partition", url:"https://leetcode.com/problems/array-partition/description/" },
  { id:"b51", phase:0, topic:"Basics: Greedy", subtopic:"Greedy Fundamentals", name:"Can Place Flowers", url:"https://leetcode.com/problems/can-place-flowers/description/" },
  { id:"b52", phase:0, topic:"Basics: Greedy", subtopic:"Greedy Fundamentals", name:"Lemonade Change", url:"https://leetcode.com/problems/lemonade-change/description/" },
  { id:"b53", phase:0, topic:"Basics: DP", subtopic:"DP Fundamentals", name:"Fibonacci (Memoization/Tabulation)", url:"https://leetcode.com/problems/fibonacci-number/description/" },
  { id:"b54", phase:0, topic:"Basics: DP", subtopic:"DP Fundamentals", name:"Climbing Stairs (Basics)", url:"https://leetcode.com/problems/climbing-stairs/description/" },
  { id:"b55", phase:0, topic:"Basics: DP", subtopic:"DP Fundamentals", name:"Pascal's Triangle (Basics)", url:"https://leetcode.com/problems/pascals-triangle/description/" },
  { id:"b56", phase:0, topic:"Basics: DP", subtopic:"DP Fundamentals", name:"Best Time to Buy and Sell Stocks (Basics)", url:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/" },
  { id:"b57", phase:0, topic:"Basics: DP", subtopic:"DP Fundamentals", name:"Counting Bits", url:"https://leetcode.com/problems/counting-bits/description/" },
  { id:"b58", phase:0, topic:"Basics: Graphs", subtopic:"Graph Traversal", name:"Rotting Oranges (BFS)", url:"https://leetcode.com/problems/rotting-oranges/description/" },
  { id:"b59", phase:0, topic:"Basics: Graphs", subtopic:"Graph Traversal", name:"Find if Path Exists in Graph", url:"https://leetcode.com/problems/find-if-path-exists-in-graph/description/" },
  { id:"b60", phase:0, topic:"Basics: Graphs", subtopic:"Graph Traversal", name:"Directed Graph Cycle (DFS)", url:"https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1" },
  { id:"b61", phase:0, topic:"Basics: Graphs", subtopic:"Graph Traversal", name:"Number of Islands", url:"https://leetcode.com/problems/number-of-islands/description/" },

  // ── PHASE 1: Cheat Sheet ─────────────────────────────────────────────────
  { id:1,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Richest Customer Wealth", url:`${LC}richest-customer-wealth/` },
  { id:2,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Two Sum", url:`${LC}two-sum/` },
  { id:3,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Count Negative Numbers In A Sorted Matrix", url:`${LC}count-negative-numbers-in-a-sorted-matrix/` },
  { id:4,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Next Permutation", url:`${LC}next-permutation/` },
  { id:5,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Median Of Two Sorted Arrays", url:`${LC}median-of-two-sorted-arrays/` },
  { id:6,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Find Greatest Common Divisor Of Array", url:`${LC}find-greatest-common-divisor-of-array/` },
  { id:7,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Self Dividing Numbers", url:`${LC}self-dividing-numbers/` },
  { id:8,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Inversion Of Array", url:`${GFG}inversion-of-array/` },
  { id:9,   phase:1, topic:"Arrays", subtopic:"1-D Array", name:"Reverse Pairs", url:`${LC}reverse-pairs/` },
  { id:10,  phase:1, topic:"Arrays", subtopic:"2-D Array", name:"Special Positions In A Binary Matrix", url:`${LC}special-positions-in-a-binary-matrix/` },
  { id:11,  phase:1, topic:"Arrays", subtopic:"2-D Array", name:"Transpose Matrix", url:`${LC}transpose-matrix/` },
  { id:12,  phase:1, topic:"Arrays", subtopic:"2-D Array", name:"01 Matrix", url:`${LC}01-matrix/` },
  { id:13,  phase:1, topic:"Arrays", subtopic:"2-D Array", name:"Spiral Matrix", url:`${LC}spiral-matrix/` },
  { id:14,  phase:1, topic:"Arrays", subtopic:"2-D Array", name:"Pascal's Triangle", url:`${LC}pascals-triangle/` },
  { id:15,  phase:1, topic:"Arrays", subtopic:"Prefix Sum", name:"Minimum Size Subarray Sum", url:`${LC}minimum-size-subarray-sum/` },
  { id:16,  phase:1, topic:"Arrays", subtopic:"Prefix Sum", name:"Running Sum Of 1d Array", url:`${LC}running-sum-of-1d-array/` },
  { id:17,  phase:1, topic:"Arrays", subtopic:"Prefix Sum", name:"Range Sum Query 2D Immutable", url:`${LC}range-sum-query-2d-immutable/` },
  { id:18,  phase:1, topic:"Arrays", subtopic:"Kadane's Algorithm", name:"Maximum Subarray", url:`${LC}maximum-subarray/` },
  { id:19,  phase:1, topic:"Arrays", subtopic:"Kadane's Algorithm", name:"Maximum Sum Circular Subarray", url:`${LC}maximum-sum-circular-subarray/` },
  { id:20,  phase:1, topic:"Arrays", subtopic:"Kadane's Algorithm", name:"Longest Turbulent Subarray", url:`${LC}longest-turbulent-subarray/` },
  { id:21,  phase:1, topic:"Arrays", subtopic:"Sliding Window", name:"Contains Duplicate II", url:`${LC}contains-duplicate-ii/` },
  { id:22,  phase:1, topic:"Arrays", subtopic:"Sliding Window", name:"Number Of Sub-Arrays Of Size K And Average", url:`${LC}number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/` },
  { id:23,  phase:1, topic:"Arrays", subtopic:"Sliding Window", name:"Minimum Size Subarray Sum (Variable)", url:`${LC}minimum-size-subarray-sum/` },
  { id:24,  phase:1, topic:"Arrays", subtopic:"Sliding Window", name:"Longest Substring Without Repeating Characters", url:`${LC}longest-substring-without-repeating-characters/` },
  { id:25,  phase:1, topic:"Arrays", subtopic:"Sliding Window", name:"Longest Repeating Character Replacement", url:`${LC}longest-repeating-character-replacement/` },
  { id:26,  phase:1, topic:"Arrays", subtopic:"Two Pointers", name:"Container With Most Water", url:`${LC}container-with-most-water/` },
  { id:27,  phase:1, topic:"Arrays", subtopic:"Two Pointers", name:"Trapping Rain Water", url:`${LC}trapping-rain-water/` },
  { id:28,  phase:1, topic:"Arrays", subtopic:"Two Pointers", name:"Two Sum II - Input Array Is Sorted", url:`${LC}two-sum-ii-input-array-is-sorted/` },
  { id:29,  phase:1, topic:"Arrays", subtopic:"Two Pointers", name:"K-Diff Pairs In An Array", url:`${LC}k-diff-pairs-in-an-array/` },
  { id:30,  phase:1, topic:"Arrays", subtopic:"Two Pointers", name:"Find K Closest Elements", url:`${LC}find-k-closest-elements/` },
  { id:31,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Search In Rotated Sorted Array", url:`${LC}search-in-rotated-sorted-array/` },
  { id:32,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Remove Duplicates From Sorted Array", url:`${LC}remove-duplicates-from-sorted-array/` },
  { id:33,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Find First And Last Position Of Element In Sorted Array", url:`${LC}find-first-and-last-position-of-element-in-sorted-array/` },
  { id:34,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Search A 2D Matrix", url:`${LC}search-a-2d-matrix/` },
  { id:35,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Find Peak Element", url:`${LC}find-peak-element/` },
  { id:36,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Single Element In A Sorted Array", url:`${LC}single-element-in-a-sorted-array/` },
  { id:37,  phase:1, topic:"Binary Search", subtopic:"Binary Search", name:"Preimage Size Of Factorial Zeroes Function", url:`${LC}preimage-size-of-factorial-zeroes-function/` },
  { id:38,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"Check If Two Arrays Are Equal Or Not", url:`${GFG}check-if-two-arrays-are-equal-or-not/` },
  { id:39,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"Binary Array Sorting", url:`${GFG}sort-a-binary-array-using-one-traversal/` },
  { id:40,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"Sort Colors", url:`${LC}sort-colors/` },
  { id:41,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"Kth Largest Element In An Array", url:`${LC}kth-largest-element-in-an-array/` },
  { id:42,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"Minimum Absolute Difference", url:`${LC}minimum-absolute-difference/` },
  { id:43,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"K Closest Points To Origin", url:`${LC}k-closest-points-to-origin/` },
  { id:44,  phase:1, topic:"Sorting", subtopic:"Sorting", name:"Max Chunks To Make Sorted", url:`${LC}max-chunks-to-make-sorted/` },
  { id:45,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Contiguous Array", url:`${LC}contiguous-array/` },
  { id:46,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Longest Consecutive Sequence", url:`${LC}longest-consecutive-sequence/` },
  { id:47,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Subarray Sum Equals K", url:`${LC}subarray-sum-equals-k/` },
  { id:48,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Valid Anagram", url:`${LC}valid-anagram/` },
  { id:49,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Valid Sudoku", url:`${LC}valid-sudoku/` },
  { id:50,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Ugly Number II", url:`${LC}ugly-number-ii/` },
  { id:51,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Subarray Sum Equals K (II)", url:`${LC}subarray-sum-equals-k/` },
  { id:52,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Max Points On A Line", url:`${LC}max-points-on-a-line/` },
  { id:53,  phase:1, topic:"Hashing", subtopic:"Hashing", name:"Palindrome Pairs", url:`${LC}palindrome-pairs/` },
  { id:54,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Middle Of The Linked List", url:`${LC}middle-of-the-linked-list/` },
  { id:55,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Maximum Twin Sum Of A Linked List", url:`${LC}maximum-twin-sum-of-a-linked-list/` },
  { id:56,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Merge Two Sorted Lists", url:`${LC}merge-two-sorted-lists/` },
  { id:57,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Linked List Cycle", url:`${LC}linked-list-cycle/` },
  { id:58,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Reverse Nodes In K-Group", url:`${LC}reverse-nodes-in-k-group/` },
  { id:59,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Remove Nth Node From End Of List", url:`${LC}remove-nth-node-from-end-of-list/` },
  { id:60,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Linked List Cycle II", url:`${LC}linked-list-cycle-ii/` },
  { id:61,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Delete Node In A Linked List", url:`${LC}delete-node-in-a-linked-list/` },
  { id:62,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Reverse Linked List", url:`${LC}reverse-linked-list/` },
  { id:63,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Palindrome Linked List", url:`${LC}palindrome-linked-list/` },
  { id:64,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Remove Linked List Elements", url:`${LC}remove-linked-list-elements/` },
  { id:65,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Convert Binary Number In A Linked List To Integer", url:`${LC}convert-binary-number-in-a-linked-list-to-integer/` },
  { id:66,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Remove Duplicates From Sorted List II", url:`${LC}remove-duplicates-from-sorted-list-ii/` },
  { id:67,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Reverse Linked List II", url:`${LC}reverse-linked-list-ii/` },
  { id:68,  phase:1, topic:"Linked Lists", subtopic:"Linked Lists", name:"Sort List", url:`${LC}sort-list/` },
  { id:69,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Implement Stack Using Queues", url:`${LC}implement-stack-using-queues/` },
  { id:70,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Implement Queue Using Stacks", url:`${LC}implement-queue-using-stacks/` },
  { id:71,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Backspace String Compare", url:`${LC}backspace-string-compare/` },
  { id:72,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Baseball Game", url:`${LC}baseball-game/` },
  { id:73,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Longest Valid Parentheses", url:`${LC}longest-valid-parentheses/` },
  { id:74,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Evaluate Reverse Polish Notation", url:`${LC}evaluate-reverse-polish-notation/` },
  { id:75,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Daily Temperatures", url:`${LC}daily-temperatures/` },
  { id:76,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Largest Rectangle In Histogram", url:`${LC}largest-rectangle-in-histogram/` },
  { id:77,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Min Stack", url:`${LC}min-stack/` },
  { id:78,  phase:1, topic:"Stack & Queue", subtopic:"Stack & Queue", name:"Minimum Remove To Make Valid Parentheses", url:`${LC}minimum-remove-to-make-valid-parentheses/` },
  { id:79,  phase:1, topic:"Heap", subtopic:"Heap", name:"Find Median From Data Stream", url:`${LC}find-median-from-data-stream/` },
  { id:80,  phase:1, topic:"Heap", subtopic:"Heap", name:"Merge K Sorted Lists", url:`${LC}merge-k-sorted-lists/` },
  { id:81,  phase:1, topic:"Heap", subtopic:"Heap", name:"Find K Pairs With Smallest Sums", url:`${LC}find-k-pairs-with-smallest-sums/` },
  { id:82,  phase:1, topic:"Heap", subtopic:"Heap", name:"Meeting Rooms II", url:`${LC}meeting-rooms-ii/` },
  { id:83,  phase:1, topic:"Heap", subtopic:"Heap", name:"Top K Frequent Elements", url:`${LC}top-k-frequent-elements/` },
  { id:84,  phase:1, topic:"Heap", subtopic:"Heap", name:"K Closest Points To Origin", url:`${LC}k-closest-points-to-origin/` },
  { id:85,  phase:1, topic:"Recursion & Backtracking", subtopic:"Recursion", name:"Count Good Numbers", url:`${LC}count-good-numbers/` },
  { id:86,  phase:1, topic:"Recursion & Backtracking", subtopic:"Recursion", name:"Permutations", url:`${LC}permutations/` },
  { id:87,  phase:1, topic:"Recursion & Backtracking", subtopic:"Recursion", name:"Permutations II", url:`${LC}permutations-ii/` },
  { id:88,  phase:1, topic:"Recursion & Backtracking", subtopic:"Recursion", name:"Subsets", url:`${LC}subsets/` },
  { id:89,  phase:1, topic:"Recursion & Backtracking", subtopic:"Recursion", name:"Basic Calculator", url:`${LC}basic-calculator/` },
  { id:90,  phase:1, topic:"Recursion & Backtracking", subtopic:"Recursion", name:"Wildcard Matching", url:`${LC}wildcard-matching/` },
  { id:91,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Combinations", url:`${LC}combinations/` },
  { id:92,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Combination Sum", url:`${LC}combination-sum/` },
  { id:93,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Combination Sum III", url:`${LC}combination-sum-iii/` },
  { id:94,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Letter Combinations Of A Phone Number", url:`${LC}letter-combinations-of-a-phone-number/` },
  { id:95,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Gray Code", url:`${LC}gray-code/` },
  { id:96,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Letter Case Permutation", url:`${LC}letter-case-permutation/` },
  { id:97,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"N-Queens", url:`${LC}n-queens/` },
  { id:98,  phase:1, topic:"Recursion & Backtracking", subtopic:"Backtracking", name:"Sudoku Solver", url:`${LC}sudoku-solver/` },
  { id:99,  phase:1, topic:"Trees", subtopic:"Binary Tree", name:"Construct Binary Tree From Inorder And Postorder Traversal", url:`${LC}construct-binary-tree-from-inorder-and-postorder-traversal/` },
  { id:100, phase:1, topic:"Trees", subtopic:"Binary Tree", name:"Construct Binary Tree From Preorder And Inorder Traversal", url:`${LC}construct-binary-tree-from-preorder-and-inorder-traversal/` },
  { id:101, phase:1, topic:"Trees", subtopic:"Binary Tree", name:"Path Sum", url:`${LC}path-sum/` },
  { id:102, phase:1, topic:"Trees", subtopic:"Binary Tree", name:"Same Tree", url:`${LC}same-tree/` },
  { id:103, phase:1, topic:"Trees", subtopic:"Level Order BFS", name:"Binary Tree Level Order Traversal", url:`${LC}binary-tree-level-order-traversal/` },
  { id:104, phase:1, topic:"Trees", subtopic:"Level Order BFS", name:"Invert Binary Tree", url:`${LC}invert-binary-tree/` },
  { id:105, phase:1, topic:"Trees", subtopic:"Level Order BFS", name:"Minimum Cost Tree From Leaf Values", url:`${LC}minimum-cost-tree-from-leaf-values/` },
  { id:106, phase:1, topic:"Trees", subtopic:"Level Order BFS", name:"Binary Tree Zigzag Level Order Traversal", url:`${LC}binary-tree-zigzag-level-order-traversal/` },
  { id:107, phase:1, topic:"Trees", subtopic:"DFS", name:"Maximum Depth Of Binary Tree", url:`${LC}maximum-depth-of-binary-tree/` },
  { id:108, phase:1, topic:"Trees", subtopic:"DFS", name:"Sum Of Left Leaves", url:`${LC}sum-of-left-leaves/` },
  { id:109, phase:1, topic:"Trees", subtopic:"DFS", name:"Binary Tree Right Side View", url:`${LC}binary-tree-right-side-view/` },
  { id:110, phase:1, topic:"Trees", subtopic:"DFS", name:"Path Sum II", url:`${LC}path-sum-ii/` },
  { id:111, phase:1, topic:"Trees", subtopic:"DFS", name:"Path Sum III", url:`${LC}path-sum-iii/` },
  { id:112, phase:1, topic:"Trees", subtopic:"BST", name:"Lowest Common Ancestor Of A BST", url:`${LC}lowest-common-ancestor-of-a-binary-search-tree/` },
  { id:113, phase:1, topic:"Trees", subtopic:"BST", name:"Closest Binary Search Tree Value II", url:`${LC}closest-binary-search-tree-value-ii/` },
  { id:114, phase:1, topic:"Trees", subtopic:"BST", name:"Trim A Binary Search Tree", url:`${LC}trim-a-binary-search-tree/` },
  { id:115, phase:1, topic:"Trees", subtopic:"BST", name:"Search In A Binary Search Tree", url:`${LC}search-in-a-binary-search-tree/` },
  { id:116, phase:1, topic:"Trees II", subtopic:"BBST / AVL", name:"Queue Reconstruction By Height", url:`${LC}queue-reconstruction-by-height/` },
  { id:117, phase:1, topic:"Trees II", subtopic:"BBST / AVL", name:"Binary Tree Pruning", url:`${LC}binary-tree-pruning/` },
  { id:118, phase:1, topic:"Trees II", subtopic:"BBST / AVL", name:"Balance A Binary Search Tree", url:`${LC}balance-a-binary-search-tree/` },
  { id:119, phase:1, topic:"Trees II", subtopic:"BBST / AVL", name:"Balanced Binary Tree", url:`${LC}balanced-binary-tree/` },
  { id:120, phase:1, topic:"Trees II", subtopic:"Trie", name:"Implement Trie (Prefix Tree)", url:`${LC}implement-trie-prefix-tree/` },
  { id:121, phase:1, topic:"Trees II", subtopic:"Trie", name:"Design Add And Search Words Data Structure", url:`${LC}design-add-and-search-words-data-structure/` },
  { id:122, phase:1, topic:"Trees II", subtopic:"Trie", name:"Word Search II", url:`${LC}word-search-ii/` },
  { id:123, phase:1, topic:"Trees II", subtopic:"Union-Find", name:"Redundant Connection", url:`${LC}redundant-connection/` },
  { id:124, phase:1, topic:"Trees II", subtopic:"Union-Find", name:"Accounts Merge", url:`${LC}accounts-merge/` },
  { id:125, phase:1, topic:"Trees II", subtopic:"Segment Tree", name:"Range Sum Query Mutable", url:`${LC}range-sum-query-mutable/` },
  { id:126, phase:1, topic:"Trees II", subtopic:"Segment Tree", name:"Longest Increasing Subsequence II", url:`${LC}longest-increasing-subsequence-ii/` },
  { id:127, phase:1, topic:"Graphs", subtopic:"BFS & DFS", name:"Rotting Oranges", url:`${LC}rotting-oranges/` },
  { id:128, phase:1, topic:"Graphs", subtopic:"BFS & DFS", name:"Word Ladder", url:`${LC}word-ladder/` },
  { id:129, phase:1, topic:"Graphs", subtopic:"BFS & DFS", name:"Number Of Provinces", url:`${LC}number-of-provinces/` },
  { id:130, phase:1, topic:"Graphs", subtopic:"BFS & DFS", name:"Number Of Enclaves", url:`${LC}number-of-enclaves/` },
  { id:131, phase:1, topic:"Graphs", subtopic:"Cycle Detection", name:"Detect Cycle In An Undirected Graph", url:`${GFG}detect-cycle-undirected-graph/` },
  { id:132, phase:1, topic:"Graphs", subtopic:"Cycle Detection", name:"Detect Cycle In A Directed Graph", url:`${GFG}detect-cycle-in-a-directed-graph/` },
  { id:133, phase:1, topic:"Graphs", subtopic:"Cycle Detection", name:"Course Schedule", url:`${LC}course-schedule/` },
  { id:134, phase:1, topic:"Graphs", subtopic:"Cycle Detection", name:"Course Schedule II", url:`${LC}course-schedule-ii/` },
  { id:135, phase:1, topic:"Graphs", subtopic:"Cycle Detection", name:"Find Eventual Safe States", url:`${LC}find-eventual-safe-states/` },
  { id:136, phase:1, topic:"Graphs", subtopic:"Cycle Detection", name:"Alien Dictionary", url:`${LC}alien-dictionary/` },
  { id:137, phase:1, topic:"Graphs", subtopic:"Dijkstra's (SSSP)", name:"Network Delay Time", url:`${LC}network-delay-time/` },
  { id:138, phase:1, topic:"Graphs", subtopic:"Dijkstra's (SSSP)", name:"Shortest Path In Binary Matrix", url:`${LC}shortest-path-in-binary-matrix/` },
  { id:139, phase:1, topic:"Graphs", subtopic:"Dijkstra's (SSSP)", name:"Path With Minimum Effort", url:`${LC}path-with-minimum-effort/` },
  { id:140, phase:1, topic:"Graphs", subtopic:"Dijkstra's (SSSP)", name:"Cheapest Flights Within K Stops", url:`${LC}cheapest-flights-within-k-stops/` },
  { id:141, phase:1, topic:"Graphs", subtopic:"Prim's & Kruskal's (MST)", name:"Min Cost To Connect All Points", url:`${LC}min-cost-to-connect-all-points/` },
  { id:142, phase:1, topic:"Graphs", subtopic:"Prim's & Kruskal's (MST)", name:"Find Critical And Pseudo-Critical Edges In MST", url:`${LC}find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/` },
  { id:143, phase:1, topic:"Graphs", subtopic:"Prim's & Kruskal's (MST)", name:"Connecting Cities With Minimum Cost", url:`${LC}connecting-cities-with-minimum-cost/` },
  { id:144, phase:1, topic:"Graphs", subtopic:"Floyd-Warshall (APSP)", name:"Course Schedule IV", url:`${LC}course-schedule-iv/` },
  { id:145, phase:1, topic:"Graphs", subtopic:"Floyd-Warshall (APSP)", name:"Find The City With Smallest Number Of Neighbors", url:`${LC}find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/` },
  { id:146, phase:1, topic:"Graphs", subtopic:"Floyd-Warshall (APSP)", name:"Number Of Ways To Arrive At Destination", url:`${LC}number-of-ways-to-arrive-at-a-destination/` },
  { id:147, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Non-Overlapping Intervals", url:`${LC}non-overlapping-intervals/` },
  { id:148, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Minimum Platforms", url:`${GFG}minimum-number-platforms-required-railwaybus-station/` },
  { id:149, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Maximize Sum Of Array After K Negations", url:`${LC}maximize-sum-of-array-after-k-negations/` },
  { id:150, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Assign Mice To Holes", url:`${GFG}assign-mice-holes/` },
  { id:151, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Maximum Product Of Three Numbers", url:`${LC}maximum-product-of-three-numbers/` },
  { id:152, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Bulb Switcher", url:`${LC}bulb-switcher/` },
  { id:153, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Candy", url:`${LC}candy/` },
  { id:154, phase:1, topic:"Greedy", subtopic:"Greedy", name:"Maximum Swap", url:`${LC}maximum-swap/` },
  { id:155, phase:1, topic:"Dynamic Programming", subtopic:"Climbing Stairs", name:"Climbing Stairs", url:`${LC}climbing-stairs/` },
  { id:156, phase:1, topic:"Dynamic Programming", subtopic:"Climbing Stairs", name:"Decode Ways", url:`${LC}decode-ways/` },
  { id:157, phase:1, topic:"Dynamic Programming", subtopic:"Climbing Stairs", name:"Frog Jump", url:`${LC}frog-jump/` },
  { id:158, phase:1, topic:"Dynamic Programming", subtopic:"Coin Change (1D DP)", name:"Coin Change", url:`${LC}coin-change/` },
  { id:159, phase:1, topic:"Dynamic Programming", subtopic:"Coin Change (1D DP)", name:"Minimum Jumps To Reach Home", url:`${LC}minimum-jumps-to-reach-home/` },
  { id:160, phase:1, topic:"Dynamic Programming", subtopic:"Buy & Sell Stock", name:"Best Time To Buy And Sell Stock", url:`${LC}best-time-to-buy-and-sell-stock/` },
  { id:161, phase:1, topic:"Dynamic Programming", subtopic:"Buy & Sell Stock", name:"Best Time To Buy And Sell Stock II", url:`${LC}best-time-to-buy-and-sell-stock-ii/` },
  { id:162, phase:1, topic:"Dynamic Programming", subtopic:"Buy & Sell Stock", name:"Best Time To Buy And Sell Stock III", url:`${LC}best-time-to-buy-and-sell-stock-iii/` },
  { id:163, phase:1, topic:"Dynamic Programming", subtopic:"Buy & Sell Stock", name:"Best Time To Buy And Sell Stock IV", url:`${LC}best-time-to-buy-and-sell-stock-iv/` },
  { id:164, phase:1, topic:"Dynamic Programming", subtopic:"Buy & Sell Stock", name:"Best Time To Buy And Sell Stock With Cooldown", url:`${LC}best-time-to-buy-and-sell-stock-with-cooldown/` },
  { id:165, phase:1, topic:"Dynamic Programming", subtopic:"Buy & Sell Stock", name:"Best Time To Buy And Sell Stock With Transaction Fee", url:`${LC}best-time-to-buy-and-sell-stock-with-transaction-fee/` },
  { id:166, phase:1, topic:"Dynamic Programming", subtopic:"0/1 Knapsack", name:"Partition Equal Subset Sum", url:`${LC}partition-equal-subset-sum/` },
  { id:167, phase:1, topic:"Dynamic Programming", subtopic:"0/1 Knapsack", name:"Ones And Zeroes", url:`${LC}ones-and-zeroes/` },
  { id:168, phase:1, topic:"Dynamic Programming", subtopic:"Unbounded Knapsack", name:"Coin Change II", url:`${LC}coin-change-ii/` },
  { id:169, phase:1, topic:"Dynamic Programming", subtopic:"Unbounded Knapsack", name:"Last Stone Weight II", url:`${LC}last-stone-weight-ii/` },
  { id:170, phase:1, topic:"Dynamic Programming", subtopic:"LCS", name:"Longest Common Subsequence", url:`${LC}longest-common-subsequence/` },
  { id:171, phase:1, topic:"Dynamic Programming", subtopic:"LCS", name:"Edit Distance", url:`${LC}edit-distance/` },
  { id:172, phase:1, topic:"Dynamic Programming", subtopic:"LCS", name:"Longest Palindromic Subsequence", url:`${LC}longest-palindromic-subsequence/` },
  { id:173, phase:1, topic:"Dynamic Programming", subtopic:"LCS", name:"Minimum Insertion Steps To Make A String Palindrome", url:`${LC}minimum-insertion-steps-to-make-a-string-palindrome/` },
  { id:174, phase:1, topic:"Dynamic Programming", subtopic:"LIS", name:"Longest Increasing Subsequence", url:`${LC}longest-increasing-subsequence/` },
  { id:175, phase:1, topic:"Dynamic Programming", subtopic:"LIS", name:"Largest Divisible Subset", url:`${LC}largest-divisible-subset/` },
  { id:176, phase:1, topic:"Dynamic Programming", subtopic:"LIS", name:"Longest String Chain", url:`${LC}longest-string-chain/` },
  { id:177, phase:1, topic:"Dynamic Programming", subtopic:"MCM", name:"Minimum Cost To Cut A Stick", url:`${LC}minimum-cost-to-cut-a-stick/` },
  { id:178, phase:1, topic:"Dynamic Programming", subtopic:"MCM", name:"Burst Balloons", url:`${LC}burst-balloons/` },
  { id:179, phase:1, topic:"Dynamic Programming", subtopic:"MCM", name:"Parsing A Boolean Expression", url:`${LC}parsing-a-boolean-expression/` },
  { id:180, phase:1, topic:"Dynamic Programming", subtopic:"MCM", name:"Palindrome Partitioning II", url:`${LC}palindrome-partitioning-ii/` },
  { id:181, phase:1, topic:"Dynamic Programming", subtopic:"DP on Grids & Trees", name:"Shortest Path Visiting All Nodes", url:`${LC}shortest-path-visiting-all-nodes/` },
  { id:182, phase:1, topic:"Dynamic Programming", subtopic:"DP on Grids & Trees", name:"Unique Paths", url:`${LC}unique-paths/` },
  { id:183, phase:1, topic:"Dynamic Programming", subtopic:"DP on Grids & Trees", name:"Unique Paths II", url:`${LC}unique-paths-ii/` },
  { id:184, phase:1, topic:"Dynamic Programming", subtopic:"DP on Grids & Trees", name:"Minimum Path Sum", url:`${LC}minimum-path-sum/` },
  { id:185, phase:1, topic:"Dynamic Programming", subtopic:"DP on Grids & Trees", name:"Russian Doll Envelopes", url:`${LC}russian-doll-envelopes/` },
  { id:186, phase:1, topic:"Math", subtopic:"Math", name:"Find Greatest Common Divisor Of Array", url:`${LC}find-greatest-common-divisor-of-array/` },
  { id:187, phase:1, topic:"Math", subtopic:"Math", name:"Self Dividing Numbers", url:`${LC}self-dividing-numbers/` },
  { id:188, phase:1, topic:"Math", subtopic:"Math", name:"Number Of Good Pairs", url:`${LC}number-of-good-pairs/` },
  { id:189, phase:1, topic:"Math", subtopic:"Math", name:"Four Divisors", url:`${LC}four-divisors/` },
  { id:190, phase:1, topic:"Math", subtopic:"Math", name:"Day Of The Week", url:`${LC}day-of-the-week/` },
  { id:191, phase:1, topic:"Math", subtopic:"Math", name:"Subtract The Product And Sum Of Digits Of An Integer", url:`${LC}subtract-the-product-and-sum-of-digits-of-an-integer/` },
  { id:192, phase:1, topic:"Math", subtopic:"Math", name:"Count Of Matches In Tournament", url:`${LC}count-of-matches-in-tournament/` },
  { id:193, phase:1, topic:"Math", subtopic:"Math", name:"Max Consecutive Ones", url:`${LC}max-consecutive-ones/` },
  { id:194, phase:1, topic:"Math", subtopic:"Math", name:"Rectangle Overlap", url:`${LC}rectangle-overlap/` },
  { id:195, phase:1, topic:"Math", subtopic:"Math", name:"Excel Sheet Column", url:`${LC}excel-sheet-column-title/` },
  { id:196, phase:1, topic:"Math", subtopic:"Math", name:"Unique Paths (Math)", url:`${LC}unique-paths/` },
  { id:197, phase:1, topic:"Math", subtopic:"Math", name:"Rectangle Area", url:`${LC}rectangle-area/` },
  { id:198, phase:1, topic:"Math", subtopic:"Math", name:"Check If Array Pairs Are Divisible By K", url:`${LC}check-if-array-pairs-are-divisible-by-k/` },
  { id:199, phase:1, topic:"Math", subtopic:"Math", name:"Factorial Trailing Zeroes", url:`${LC}factorial-trailing-zeroes/` },
  { id:200, phase:1, topic:"Math", subtopic:"Math", name:"Nth Magical Number", url:`${LC}nth-magical-number/` },
  { id:201, phase:1, topic:"Math", subtopic:"Math", name:"Permutation Sequence", url:`${LC}permutation-sequence/` },
  { id:202, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Single Number", url:`${LC}single-number/` },
  { id:203, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Reverse Bits", url:`${LC}reverse-bits/` },
  { id:204, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Single Number II", url:`${LC}single-number-ii/` },
  { id:205, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Number Of 1 Bits", url:`${LC}number-of-1-bits/` },
  { id:206, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Factorial Trailing Zeroes (Bit)", url:`${LC}factorial-trailing-zeroes/` },
  { id:207, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Binary Number With Alternating Bits", url:`${LC}binary-number-with-alternating-bits/` },
  { id:208, phase:1, topic:"Miscellaneous", subtopic:"Bit Manipulation", name:"Number Of Even And Odd Bits", url:`${LC}number-of-even-and-odd-bits/` },
  { id:209, phase:1, topic:"Miscellaneous", subtopic:"Rabin-Karp (Rolling Hash)", name:"Find The Index Of The First Occurrence In A String", url:`${LC}find-the-index-of-the-first-occurrence-in-a-string/` },
  { id:210, phase:1, topic:"Miscellaneous", subtopic:"Rabin-Karp (Rolling Hash)", name:"Repeated DNA Sequences", url:`${LC}repeated-dna-sequences/` },
  { id:211, phase:1, topic:"Miscellaneous", subtopic:"Rabin-Karp (Rolling Hash)", name:"Longest Duplicate Substring", url:`${LC}longest-duplicate-substring/` },
];

const TOPIC_COLORS = {
  "Basics: Complexity":"#94A3B8","Basics: Arrays":"#3B82F6","Basics: Linked Lists":"#EF4444",
  "Basics: Stack & Queue":"#F97316","Basics: Strings":"#F59E0B","Basics: Searching":"#10B981",
  "Basics: Sorting":"#FBBF24","Basics: Hashing":"#34D399","Basics: Recursion":"#EC4899",
  "Basics: Trees":"#14B8A6","Basics: Heap":"#06B6D4","Basics: Greedy":"#84CC16",
  "Basics: DP":"#A855F7","Basics: Graphs":"#6366F1",
  "Arrays":"#3B82F6","Binary Search":"#8B5CF6","Sorting":"#F59E0B","Hashing":"#10B981",
  "Linked Lists":"#EF4444","Stack & Queue":"#F97316","Heap":"#06B6D4",
  "Recursion & Backtracking":"#EC4899","Trees":"#14B8A6","Trees II":"#0EA5E9",
  "Graphs":"#6366F1","Greedy":"#84CC16","Dynamic Programming":"#A855F7",
  "Math":"#F43F5E","Miscellaneous":"#64748B",
};

const PHASE0_TOTAL = ALL_PROBLEMS.filter(p=>p.phase===0).length;
const PHASE1_TOTAL = ALL_PROBLEMS.filter(p=>p.phase===1).length;
const GRAND_TOTAL  = ALL_PROBLEMS.length;
const EMPTY_NOTES  = { pattern:"", approach:"", complexity:"", extra:"" };

// Pre-filled notes for Phase 0 problems
const PHASE0_NOTES = {
  "b01":{ pattern:"Analysis",        approach:"Count operations per input size, identify dominant term", complexity:"Varies" },
  "b02":{ pattern:"Analysis",        approach:"Worst=max steps, Best=min steps, Average=expected steps", complexity:"Varies" },
  "b03":{ pattern:"Linear Search",   approach:"Iterate each element, compare with target", complexity:"O(n) time, O(1) space" },
  "b04":{ pattern:"Binary Search",   approach:"lo=0,hi=n-1; mid=(lo+hi)/2; shrink half each step", complexity:"O(log n) time, O(1) space" },
  "b05":{ pattern:"Two Pointers",    approach:"Swap arr[lo] and arr[hi], move pointers inward", complexity:"O(n) time, O(1) space" },
  "b06":{ pattern:"Linear Scan",     approach:"Track min & max in single pass", complexity:"O(n) time, O(1) space" },
  "b07":{ pattern:"Prefix Sum",      approach:"prefix[i] = prefix[i-1] + arr[i]; range sum = prefix[r]-prefix[l-1]", complexity:"O(n) build, O(1) query" },
  "b08":{ pattern:"Linked List",     approach:"Traverse to last node, create new node, set next=null", complexity:"O(n) time, O(1) space" },
  "b09":{ pattern:"Linked List",     approach:"Copy next node's value, skip next node (can't access prev)", complexity:"O(1) time, O(1) space" },
  "b10":{ pattern:"Two Pointers",    approach:"prev=null, curr=head; reverse next pointer, advance both", complexity:"O(n) time, O(1) space" },
  "b11":{ pattern:"Two Pointers",    approach:"Compare heads, attach smaller, advance that pointer", complexity:"O(m+n) time, O(1) space" },
  "b12":{ pattern:"Stack (Array)",   approach:"top pointer; push=arr[++top]=val; pop=arr[top--]", complexity:"O(1) push/pop" },
  "b13":{ pattern:"Stack (LL)",      approach:"New node at head for push; remove head for pop", complexity:"O(1) push/pop" },
  "b14":{ pattern:"Stack",           approach:"Push open brackets; on close bracket check top matches", complexity:"O(n) time, O(n) space" },
  "b15":{ pattern:"Two Pointers",    approach:"Find mid (slow/fast), reverse second half, compare", complexity:"O(n) time, O(1) space" },
  "b16":{ pattern:"Queue (Array)",   approach:"front/rear pointers; circular array to avoid shifting", complexity:"O(1) enqueue/dequeue" },
  "b17":{ pattern:"Queue (LL)",      approach:"Enqueue at tail, dequeue at head with head/tail pointers", complexity:"O(1) enqueue/dequeue" },
  "b18":{ pattern:"Queue",           approach:"Use deque/queue; remove calls older than t-3000", complexity:"O(1) amortized" },
  "b19":{ pattern:"Two Pointers",    approach:"lo=0,hi=n-1; compare chars, skip non-alphanumeric", complexity:"O(n) time, O(1) space" },
  "b20":{ pattern:"String",          approach:"Use built-in string methods / character manipulation", complexity:"O(n) time" },
  "b21":{ pattern:"Two Pointers",    approach:"Swap s[lo] and s[hi], move inward", complexity:"O(n) time, O(1) space" },
  "b22":{ pattern:"String",          approach:"For each char, if uppercase add 32 (ASCII) or use tolower", complexity:"O(n) time, O(n) space" },
  "b23":{ pattern:"Linear Search",   approach:"Iterate array, return index when match found", complexity:"O(n) time, O(1) space" },
  "b24":{ pattern:"Binary Search",   approach:"Standard binary search on sorted array", complexity:"O(log n) time, O(1) space" },
  "b25":{ pattern:"Math / XOR",      approach:"XOR all nums with 0..n; missing = XOR result. Or sum formula: n*(n+1)/2 - actual sum", complexity:"O(n) time, O(1) space" },
  "b26":{ pattern:"Insertion Sort",  approach:"For i=1..n: key=arr[i]; shift larger elements right; insert key", complexity:"O(n²) time, O(1) space" },
  "b27":{ pattern:"Merge Sort",      approach:"Divide in half recursively; merge sorted halves", complexity:"O(n log n) time, O(n) space" },
  "b28":{ pattern:"Quick Sort",      approach:"Pick pivot; partition < pivot | pivot | > pivot; recurse", complexity:"O(n log n) avg, O(n²) worst, O(log n) space" },
  "b29":{ pattern:"Selection Sort",  approach:"Find min in unsorted portion; swap with current position", complexity:"O(n²) time, O(1) space" },
  "b30":{ pattern:"Hashing",         approach:"Array of size 1000 (mod 1000); chaining for collisions", complexity:"O(1) avg get/put" },
  "b31":{ pattern:"Hashing",         approach:"Boolean array of size 1000000 or hash set with chaining", complexity:"O(1) avg add/contains" },
  "b32":{ pattern:"Recursion",       approach:"Base: n==0 return 1; Recursive: n * factorial(n-1)", complexity:"O(n) time, O(n) stack" },
  "b33":{ pattern:"Math",            approach:"Check n>0 && n%3==0 iteratively or: n==Math.pow(3, round(log3(n)))", complexity:"O(log n) time" },
  "b34":{ pattern:"Recursion / Fast Power", approach:"If exp<0 flip; if exp%2==0: (x^(exp/2))²; else x*(x^(exp-1))", complexity:"O(log n) time, O(log n) space" },
  "b35":{ pattern:"Recursion / DP",  approach:"Base: F(0)=0,F(1)=1; F(n)=F(n-1)+F(n-2); memoize for O(n)", complexity:"O(n) time, O(n) space" },
  "b36":{ pattern:"Enumeration",     approach:"Iterate 100..998 step 2; check all 3 digits unique", complexity:"O(1) — fixed range" },
  "b37":{ pattern:"DFS / Stack",     approach:"Recursive: visit left, root, right. Iterative: use explicit stack", complexity:"O(n) time, O(h) space" },
  "b38":{ pattern:"DFS / Stack",     approach:"Recursive: visit root, left, right. Iterative: stack trick", complexity:"O(n) time, O(h) space" },
  "b39":{ pattern:"DFS / Stack",     approach:"Recursive: left, right, root. Iterative: reverse preorder", complexity:"O(n) time, O(h) space" },
  "b40":{ pattern:"DFS",             approach:"Both null → true; one null → false; val mismatch → false; recurse both sides", complexity:"O(n) time, O(h) space" },
  "b41":{ pattern:"DFS",             approach:"Base: null→0; return 1+max(left depth, right depth)", complexity:"O(n) time, O(h) space" },
  "b42":{ pattern:"DFS",             approach:"Subtract node.val from target; at leaf check target==0", complexity:"O(n) time, O(h) space" },
  "b43":{ pattern:"Heap",            approach:"Insert: add at end, heapify-up. Delete-min: swap root with last, heapify-down", complexity:"O(log n) insert/delete, O(1) peek" },
  "b44":{ pattern:"Heap Sort",       approach:"Build max-heap O(n); repeatedly extract max, place at end", complexity:"O(n log n) time, O(1) space" },
  "b45":{ pattern:"Min Heap / Greedy", approach:"Always combine two smallest ropes; use min-heap", complexity:"O(n log n) time, O(n) space" },
  "b46":{ pattern:"Min Heap",        approach:"Keep heap of size k; if new val > heap.min, pop and push", complexity:"O(log k) per add, O(k) space" },
  "b47":{ pattern:"Max Heap",        approach:"Max-heap; pop two largest, if equal destroy, else push diff back", complexity:"O(n log n) time" },
  "b48":{ pattern:"Greedy / Hashing", approach:"Count each char; add all even counts + (odd_count-1) for each odd; +1 if any odd char exists", complexity:"O(n) time, O(1) space" },
  "b49":{ pattern:"Greedy / Two Pointers", approach:"Sort both arrays; greedily match smallest cookie to smallest child", complexity:"O(n log n) time" },
  "b50":{ pattern:"Greedy / Sort",   approach:"Sort array; pair (arr[0],arr[1]),(arr[2],arr[3]); sum minimums", complexity:"O(n log n) time" },
  "b51":{ pattern:"Greedy",          approach:"Scan left-right; plant if curr and neighbors are 0; re-check after planting", complexity:"O(n) time, O(1) space" },
  "b52":{ pattern:"Greedy",          approach:"Track $5 and $10 bills; greedily use $10 first when giving $15 change", complexity:"O(n) time, O(1) space" },
  "b53":{ pattern:"DP / Memoization", approach:"Memo: cache[n]={F(n-1)+F(n-2)}. Tab: dp[0]=0,dp[1]=1,dp[i]=dp[i-1]+dp[i-2]", complexity:"O(n) time, O(n) space" },
  "b54":{ pattern:"DP",              approach:"dp[i]=dp[i-1]+dp[i-2]; same as Fibonacci with dp[1]=1,dp[2]=2", complexity:"O(n) time, O(1) space (optimized)" },
  "b55":{ pattern:"DP",              approach:"Each row: dp[j]=prev[j-1]+prev[j]; border cells always 1", complexity:"O(n²) time, O(n) space" },
  "b56":{ pattern:"Greedy",          approach:"Track min price seen so far; max profit = max(price - minPrice)", complexity:"O(n) time, O(1) space" },
  "b57":{ pattern:"DP / Bit",        approach:"dp[i]=dp[i>>1]+(i&1); right shift removes LSB, add 1 if odd", complexity:"O(n) time, O(n) space" },
  "b58":{ pattern:"BFS / Multi-source", approach:"Add all rotten oranges to queue; BFS layer by layer; count minutes", complexity:"O(m*n) time and space" },
  "b59":{ pattern:"BFS / DFS / Union-Find", approach:"BFS from source; visited set; check if destination reached", complexity:"O(V+E) time and space" },
  "b60":{ pattern:"DFS / Color",     approach:"3-color nodes: white=unvisited, gray=in-stack, black=done; cycle if gray neighbor found", complexity:"O(V+E) time, O(V) space" },
  "b61":{ pattern:"DFS / BFS",       approach:"For each unvisited '1', DFS/BFS to mark entire island; count starts", complexity:"O(m*n) time and space" },
};

// ── Google Drive helpers ──────────────────────────────────────────────────────
async function findOrCreateFile(token){
  const r=await fetch(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=name='${DRIVE_FILE_NAME}'&fields=files(id)`,{headers:{Authorization:`Bearer ${token}`}});
  const d=await r.json();
  if(d.files&&d.files.length>0)return d.files[0].id;
  const c=await fetch("https://www.googleapis.com/drive/v3/files?fields=id",{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify({name:DRIVE_FILE_NAME,parents:["appDataFolder"]})});
  return (await c.json()).id;
}
async function readFile(fileId,token){
  const r=await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,{headers:{Authorization:`Bearer ${token}`}});
  if(!r.ok)return null;
  try{return await r.json();}catch{return null;}
}
async function writeFile(fileId,data,token){
  await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,{method:"PATCH",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(data)});
}

// ── Token cache helpers ───────────────────────────────────────────────────────
const TOKEN_KEY="dsa_gtoken";
const TOKEN_EXPIRY_KEY="dsa_gtoken_expiry";
const FILE_ID_CACHE_KEY="dsa_gfile_id";

function saveToken(t,expiresIn){
  try{
    localStorage.setItem(TOKEN_KEY,t);
    localStorage.setItem(TOKEN_EXPIRY_KEY,String(Date.now()+(expiresIn-300)*1000));
  }catch{}
}
function getCachedToken(){
  try{
    const t=localStorage.getItem(TOKEN_KEY);
    const exp=parseInt(localStorage.getItem(TOKEN_EXPIRY_KEY)||"0");
    if(t&&Date.now()<exp)return t;
  }catch{}
  return null;
}
function clearToken(){
  try{localStorage.removeItem(TOKEN_KEY);localStorage.removeItem(TOKEN_EXPIRY_KEY);}catch{}
}
function saveFileId(fid){try{localStorage.setItem(FILE_ID_CACHE_KEY,fid);}catch{}}
function getCachedFileId(){try{return localStorage.getItem(FILE_ID_CACHE_KEY);}catch{return null;}}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function DSATracker(){
  const [authState,setAuthState]=useState("idle");
  const [syncState,setSyncState]=useState("idle");
  const [token,setToken]=useState(null);
  const [fileId,setFileId]=useState(null);
  const [progress,setProgress]=useState({checked:{},notes:{}});
  const [expanded,setExpanded]=useState({});
  const [collapsed,setCollapsed]=useState({});
  const [search,setSearch]=useState("");
  const [filterPhase,setFilterPhase]=useState("All");
  const [filterTopic,setFilterTopic]=useState("All");
  const [filterStatus,setFilterStatus]=useState("All");
  const saveTimer=useRef(null);
  const tokenClientRef=useRef(null);
  const refreshTimer=useRef(null);

  const onToken=useCallback(async(accessToken,expiresIn)=>{
    saveToken(accessToken,expiresIn||3600);
    setToken(accessToken);
    setAuthState("loading");
    // Schedule silent refresh 5min before expiry
    clearTimeout(refreshTimer.current);
    refreshTimer.current=setTimeout(()=>{
      if(tokenClientRef.current)tokenClientRef.current.requestAccessToken({prompt:""});
    },((expiresIn||3600)-300)*1000);
    try{
      let fid=getCachedFileId();
      if(!fid){fid=await findOrCreateFile(accessToken);saveFileId(fid);}
      setFileId(fid);
      const data=await readFile(fid,accessToken);
      if(data)setProgress(data);
      setAuthState("authed");
    }catch{setAuthState("error");}
  },[]);

  useEffect(()=>{
    const s=document.createElement("script");
    s.src="https://accounts.google.com/gsi/client";
    s.async=true; s.defer=true;
    document.head.appendChild(s);
    s.onload=()=>{
      tokenClientRef.current=window.google.accounts.oauth2.initTokenClient({
        client_id:GOOGLE_CLIENT_ID,
        scope:DRIVE_SCOPE,
        callback:async(resp)=>{
          if(resp.error){
            // Silent refresh failed — show sign-in button
            clearToken();
            setAuthState("idle");
            return;
          }
          onToken(resp.access_token,resp.expires_in);
        },
      });
      // Try cached token first, then silent refresh, then show button
      const cached=getCachedToken();
      if(cached){onToken(cached,3600);}
      else{tokenClientRef.current.requestAccessToken({prompt:""});}
    };
    return()=>clearTimeout(refreshTimer.current);
  },[onToken]);

  const signIn=()=>{
    clearToken();
    if(!tokenClientRef.current)return;
    setAuthState("loading");
    tokenClientRef.current.requestAccessToken({prompt:"select_account"});
  };

  const scheduleSave=useCallback((np)=>{
    if(!token||!fileId)return;
    clearTimeout(saveTimer.current);
    setSyncState("saving");
    saveTimer.current=setTimeout(async()=>{
      try{await writeFile(fileId,np,token);setSyncState("saved");setTimeout(()=>setSyncState("idle"),2500);}
      catch{setSyncState("error");}
    },800);
  },[token,fileId]);

  const updateProgress=(np)=>{setProgress(np);scheduleSave(np);};
  const toggle=(id)=>updateProgress({...progress,checked:{...progress.checked,[id]:!progress.checked[id]}});
  const updateNote=(id,field,value)=>updateProgress({...progress,notes:{...progress.notes,[id]:{...(progress.notes[id]||EMPTY_NOTES),[field]:value}}});

  const totalDone=Object.values(progress.checked).filter(Boolean).length;
  const phase0Done=ALL_PROBLEMS.filter(p=>p.phase===0&&progress.checked[p.id]).length;
  const phase1Done=ALL_PROBLEMS.filter(p=>p.phase===1&&progress.checked[p.id]).length;

  const filtered=ALL_PROBLEMS.filter(p=>{
    const ms=p.name.toLowerCase().includes(search.toLowerCase())||p.topic.toLowerCase().includes(search.toLowerCase());
    const mph=filterPhase==="All"||(filterPhase==="Phase 0"&&p.phase===0)||(filterPhase==="Phase 1"&&p.phase===1);
    const mt=filterTopic==="All"||p.topic===filterTopic;
    const mst=filterStatus==="All"||(filterStatus==="Done"&&progress.checked[p.id])||(filterStatus==="Pending"&&!progress.checked[p.id]);
    return ms&&mph&&mt&&mst;
  });

  const grouped={};
  filtered.forEach(p=>{
    const pk=p.phase===0?"Phase 0 — Basics":"Phase 1 — Cheat Sheet";
    if(!grouped[pk])grouped[pk]={};
    if(!grouped[pk][p.topic])grouped[pk][p.topic]={};
    if(!grouped[pk][p.topic][p.subtopic])grouped[pk][p.topic][p.subtopic]=[];
    grouped[pk][p.topic][p.subtopic].push(p);
  });

  const topicDone=(t)=>ALL_PROBLEMS.filter(p=>p.topic===t&&progress.checked[p.id]).length;
  const topicTotal=(t)=>ALL_PROBLEMS.filter(p=>p.topic===t).length;
  const allTopics=["All",...new Set(ALL_PROBLEMS.map(p=>p.topic))];

  const syncColor={idle:"#334155",saving:"#F59E0B",saved:"#22C55E",error:"#EF4444"}[syncState];
  const syncText={idle:"Drive synced",saving:"Saving…",saved:"Saved to Drive",error:"Save failed"}[syncState];

  // Sign-in screen
  if(authState!=="authed"){
    return(
      <div style={{minHeight:"100vh",background:"#0A0D14",color:"#E2E8F0",fontFamily:"'Inter','Segoe UI',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,textAlign:"center",padding:24}}>
        <div style={{fontSize:10,letterSpacing:3,color:"#60A5FA",fontWeight:700,textTransform:"uppercase"}}>Bosscoder DSA</div>
        <h1 style={{margin:0,fontSize:26,fontWeight:800,color:"#F1F5F9",letterSpacing:-0.5}}>Problem Tracker</h1>
        <p style={{color:"#475569",fontSize:13,margin:0}}>{GRAND_TOTAL} problems · Phase 0 Basics + Cheat Sheet · Google Drive sync</p>
        {authState==="error"&&<p style={{color:"#EF4444",fontSize:12,margin:0}}>Sign-in failed — check Client ID and Authorised Origins in Google Cloud Console.</p>}
        <button onClick={signIn} disabled={authState==="loading"} style={{background:"linear-gradient(135deg,#3B82F6,#6366F1)",border:"none",borderRadius:10,padding:"13px 32px",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
          {authState==="loading"?"Connecting…":"Sign in with Google"}
        </button>
        <p style={{color:"#334155",fontSize:11,maxWidth:340,margin:0}}>Progress saved to a private app-data file in your Google Drive — not visible in your Drive folder.</p>
      </div>
    );
  }

  // Main tracker
  return(
    <div style={{minHeight:"100vh",background:"#0A0D14",color:"#E2E8F0",fontFamily:"'Inter','Segoe UI',sans-serif",margin:0,padding:0}}>
      <style>{`
        *{box-sizing:border-box;}
        html,body,#root{margin:0;padding:0;background:#0A0D14;}
        @media print{
          @page{margin:15mm 12mm;size:A4;}
          html,body,#root{
            background:#1a1f2e!important;
            color:#CBD5E1!important;
            -webkit-print-color-adjust:exact!important;
            print-color-adjust:exact!important;
          }
          .no-print{display:none!important;}
          .print-section{page-break-inside:avoid;}
          /* Hide header UI chrome but keep progress bar area */
          header{position:static!important;}
          /* Problem rows */
          [style*="background:#0a1a0a"],[style*="background:#0d1117"]{
            background:#111827!important;
            border-color:#1E2A3A!important;
          }
          /* Topic headers */
          [style*="background:#111827"]{
            background:#0f172a!important;
          }
          /* Notes panels */
          [style*="background:#080c12"]{
            background:#0d1117!important;
          }
          /* Inputs/textareas in print */
          input,textarea{
            background:#1a2235!important;
            color:#CBD5E1!important;
            border-color:#2D3748!important;
          }
          /* Ensure text is readable */
          span,div,p{color:inherit;}
          /* Pattern/Approach/Complexity fields in print:
             - If filled: show label + value as plain text
             - If empty: show label + blank underline to write on */
          input,textarea{
            border:none!important;
            border-bottom:1px solid #4B5563!important;
            border-radius:0!important;
            padding:2px 0!important;
            background:transparent!important;
            color:#CBD5E1!important;
            min-width:100%!important;
          }
          /* Empty input: show as blank write line */
          input:placeholder-shown{
            border-bottom:1px solid #374151!important;
            color:transparent!important;
            min-height:18px!important;
          }
          /* Empty textarea: show as blank write lines */
          textarea:placeholder-shown{
            border-bottom:1px dashed #374151!important;
            color:transparent!important;
            min-height:18px!important;
            height:18px!important;
          }
          /* Extra notes empty — show 2 blank lines */
          .print-field-empty textarea{
            height:36px!important;
            border-bottom:none!important;
            background:repeating-linear-gradient(
              transparent,
              transparent 17px,
              #374151 17px,
              #374151 18px
            )!important;
          }
          /* Never hide field wrappers — always show label + line/value */
          .print-field-empty{display:block!important;}
          /* Field labels */
          .print-field-empty > div:first-child{
            color:#64748B!important;
          }
        }
      `}</style>
      {/* Header */}
      <div style={{background:"#0F1420",borderBottom:"1px solid #1a2235",padding:"18px 22px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
          <div style={{flex:1}}>
            <div style={{fontSize:9,letterSpacing:3,color:"#60A5FA",fontWeight:700,textTransform:"uppercase",marginBottom:3}}>Bosscoder DSA Tracker</div>
            <h1 style={{margin:"0 0 8px",fontSize:18,fontWeight:800,color:"#F1F5F9",letterSpacing:-0.5}}>Problem Tracker</h1>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
              {[{label:"total",val:`${totalDone}/${GRAND_TOTAL}`,c:"#60A5FA"},{label:"basics",val:`${phase0Done}/${PHASE0_TOTAL}`,c:"#94A3B8"},{label:"sheet",val:`${phase1Done}/${PHASE1_TOTAL}`,c:"#A855F7"}].map(({label,val,c})=>(
                <div key={label} style={{background:`${c}15`,border:`1px solid ${c}30`,borderRadius:7,padding:"4px 10px",display:"flex",alignItems:"center",gap:5}}>
                  <span style={{fontSize:13,fontWeight:700,color:c}}>{val}</span>
                  <span style={{fontSize:10,color:"#64748B"}}>{label}</span>
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:5,fontSize:10,color:"#475569"}}>
                <span style={{width:6,height:6,borderRadius:"50%",background:syncColor,display:"inline-block"}}/>
                {syncText}
              </div>
              <button className="no-print" onClick={()=>window.print()} style={{background:"#1E2A3A",border:"1px solid #2D3748",borderRadius:7,padding:"4px 12px",color:"#94A3B8",cursor:"pointer",fontSize:11,fontWeight:600}}>🖨 Print</button>
            </div>
            <div style={{marginTop:10,height:3,background:"#1a2235",borderRadius:2,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${(totalDone/GRAND_TOTAL)*100}%`,background:"linear-gradient(90deg,#3B82F6,#8B5CF6,#EC4899)",borderRadius:2,transition:"width 0.4s"}}/>
            </div>
          </div>
        </div>
        <div className="no-print" style={{marginTop:12,display:"flex",gap:8,flexWrap:"wrap"}}>
          <input placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)} style={{background:"#141922",border:"1px solid #1E2A3A",borderRadius:7,padding:"6px 11px",color:"#E2E8F0",fontSize:12,outline:"none",width:170}}/>
          <select value={filterPhase} onChange={e=>setFilterPhase(e.target.value)} style={{background:"#141922",border:"1px solid #1E2A3A",borderRadius:7,padding:"6px 9px",color:"#E2E8F0",fontSize:12,outline:"none"}}>
            {["All","Phase 0","Phase 1"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select value={filterTopic} onChange={e=>setFilterTopic(e.target.value)} style={{background:"#141922",border:"1px solid #1E2A3A",borderRadius:7,padding:"6px 9px",color:"#E2E8F0",fontSize:12,outline:"none"}}>
            {allTopics.map(t=><option key={t}>{t}</option>)}
          </select>
          <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{background:"#141922",border:"1px solid #1E2A3A",borderRadius:7,padding:"6px 9px",color:"#E2E8F0",fontSize:12,outline:"none"}}>
            {["All","Done","Pending"].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"18px 0 60px",width:"100%",margin:"0 auto"}}>
        {Object.entries(grouped).map(([phaseKey,topics])=>(
          <div key={phaseKey}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#4B5563",padding:"10px 18px 5px"}}>{phaseKey}</div>
            {Object.entries(topics).map(([topic,subtopics])=>{
              const color=TOPIC_COLORS[topic]||"#64748B";
              const isCollapsed=!!collapsed[topic];
              return(
                <div key={topic} className="print-section" style={{marginBottom:8,width:"100%"}}>
                  {/* Topic header */}
                  <div onClick={()=>setCollapsed(p=>({...p,[topic]:!p[topic]}))}
                    style={{display:"flex",alignItems:"center",justifyContent:"space-between",
                      padding:"11px 18px",background:"#111827",
                      borderLeft:`4px solid ${color}`,borderBottom:`1px solid ${color}20`,
                      cursor:"pointer",userSelect:"none",width:"100%",boxSizing:"border-box"}}>
                    <div style={{display:"flex",alignItems:"center",gap:9}}>
                      <span style={{fontSize:14,fontWeight:700,color:"#F1F5F9"}}>{topic}</span>
                      <span style={{background:`${color}20`,color,borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:600}}>{topicDone(topic)}/{topicTotal(topic)}</span>
                    </div>
                    <span className="no-print" style={{color:"#4B5563",fontSize:11}}>{isCollapsed?"▶":"▼"}</span>
                  </div>

                  {!isCollapsed&&(
                    <div style={{width:"100%"}}>
                      {Object.entries(subtopics).map(([subtopic,problems])=>(
                        <div key={subtopic}>
                          <div style={{fontSize:9,fontWeight:700,letterSpacing:1.5,color:"#4B5563",
                            textTransform:"uppercase",padding:"8px 18px 3px",
                            background:"#0d1117",borderLeft:`4px solid ${color}50`}}>
                            {subtopic}
                          </div>
                          {problems.map((p,idx)=>{
                            const isChecked=!!progress.checked[p.id];
                            const isExpanded=!!expanded[p.id];
                            // Merge saved notes with Phase 0 defaults
                            const savedNotes=progress.notes[p.id]||{};
                            const defaults=PHASE0_NOTES[p.id]||{};
                            const notes={
                              pattern: savedNotes.pattern!==undefined ? savedNotes.pattern : (defaults.pattern||""),
                              approach: savedNotes.approach!==undefined ? savedNotes.approach : (defaults.approach||""),
                              complexity: savedNotes.complexity!==undefined ? savedNotes.complexity : (defaults.complexity||""),
                              extra: savedNotes.extra||"",
                            };
                            const hasNotes=notes.pattern||notes.approach||notes.complexity||notes.extra;
                            return(
                              <div key={p.id} style={{
                                borderBottom:"1px solid #0d1520",
                                borderLeft:`4px solid ${isChecked?color+"80":color+"20"}`,
                                background:isChecked?"#0a1a0a":"#0d1117",
                                width:"100%",boxSizing:"border-box"}}>

                                {/* Problem row — 2 row layout */}
                                <div
                                  onClick={()=>setExpanded(prev=>({...prev,[p.id]:!prev[p.id]}))}
                                  style={{padding:"9px 18px 9px 14px",width:"100%",boxSizing:"border-box",cursor:"pointer"}}>

                                  {/* Row 1: checkbox + number + name + link */}
                                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                                    {/* Checkbox */}
                                    <div
                                      onDoubleClick={e=>{e.stopPropagation();toggle(p.id);}}
                                      onClick={e=>e.stopPropagation()}
                                      title="Double-click to mark done"
                                      style={{width:18,height:18,borderRadius:4,flexShrink:0,cursor:"pointer",
                                        border:isChecked?"none":"2px solid #374151",
                                        background:isChecked?"#22C55E":"transparent",
                                        display:"flex",alignItems:"center",justifyContent:"center",
                                        transition:"all 0.12s",userSelect:"none"}}>
                                      {isChecked&&<span style={{color:"#fff",fontSize:11,fontWeight:800}}>✓</span>}
                                    </div>
                                    {/* Number */}
                                    <span style={{fontSize:10,color:"#4B5563",fontWeight:600,minWidth:22,
                                      fontVariantNumeric:"tabular-nums",flexShrink:0}}>
                                      {String(p.id).padStart(String(p.id).length>3?0:3,"0")}
                                    </span>
                                    {/* Name */}
                                    <span
                                      onDoubleClick={e=>{e.stopPropagation();toggle(p.id);}}
                                      title="Click to open notes · Double-click to mark done"
                                      style={{flex:1,fontSize:13,fontWeight:500,
                                        color:isChecked?"#4B5563":"#E2E8F0",
                                        textDecoration:isChecked?"line-through":"none",
                                        userSelect:"none",lineHeight:1.4}}>
                                      {p.name}
                                    </span>
                                    {/* Blue dot if extra notes */}
                                    {notes.extra&&<span style={{width:5,height:5,borderRadius:"50%",background:"#3B82F6",flexShrink:0}}/>}
                                    {/* Link */}
                                    {p.url&&(
                                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                                        title="Open problem"
                                        style={{color:"#3B82F6",fontSize:14,textDecoration:"none",
                                          flexShrink:0,opacity:0.7,lineHeight:1}}
                                        onClick={e=>e.stopPropagation()}>↗</a>
                                    )}
                                  </div>

                                  {/* Row 2: pattern + complexity — always shown when not expanded */}
                                  {!isExpanded&&(
                                    <div style={{display:"flex",alignItems:"center",gap:12,
                                      marginTop:5,paddingLeft:48}}>
                                      {/* Pattern — filled = chip, empty = label + underline */}
                                      {notes.pattern ? (
                                        <span style={{fontSize:10,color:color,background:`${color}15`,
                                          borderRadius:4,padding:"2px 8px",flexShrink:0,
                                          maxWidth:180,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                                          {notes.pattern}
                                        </span>
                                      ) : (
                                        <span style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                                          <span style={{fontSize:9,color:"#374151",fontWeight:700,
                                            letterSpacing:1,textTransform:"uppercase"}}>Pattern</span>
                                          <span style={{display:"inline-block",width:100,
                                            borderBottom:"1px solid #1E2A3A"}}/>
                                        </span>
                                      )}
                                      {/* Complexity — filled = text, empty = label + underline */}
                                      {notes.complexity ? (
                                        <span style={{fontSize:10,color:"#94A3B8",flexShrink:0,
                                          maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                                          {notes.complexity}
                                        </span>
                                      ) : (
                                        <span style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                                          <span style={{fontSize:9,color:"#374151",fontWeight:700,
                                            letterSpacing:1,textTransform:"uppercase"}}>Complexity</span>
                                          <span style={{display:"inline-block",width:100,
                                            borderBottom:"1px solid #1E2A3A"}}/>
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Approach preview — only if filled and collapsed */}
                                  {notes.approach&&!isExpanded&&(
                                    <div style={{paddingLeft:48,marginTop:3,fontSize:11,
                                      color:"#64748B",lineHeight:1.4}}>
                                      {notes.approach}
                                    </div>
                                  )}

                                  {/* Extra notes first line — only if filled and collapsed */}
                                  {notes.extra&&!isExpanded&&(
                                    <div style={{
                                      paddingLeft:48,marginTop:2,
                                      fontSize:11,color:"#4B5563",lineHeight:1.4,
                                      overflow:"hidden",display:"-webkit-box",
                                      WebkitLineClamp:1,WebkitBoxOrient:"vertical",
                                      fontStyle:"italic",
                                    }}>
                                      💡 {notes.extra.split("\n")[0]}
                                    </div>
                                  )}
                                </div>

                                {/* Expanded notes panel */}
                                {isExpanded&&(
                                  <div style={{borderTop:"1px solid #131c2b",padding:"12px 18px 14px 54px",
                                    background:"#080c12",width:"100%",boxSizing:"border-box"}}>
                                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
                                      {[
                                        {f:"pattern",l:"Pattern",ph:"e.g. Sliding Window…"},
                                        {f:"approach",l:"Approach",ph:"e.g. Sort + Binary Search…"},
                                        {f:"complexity",l:"Complexity",ph:"e.g. O(n log n) / O(1)"},
                                      ].map(({f,l,ph})=>(
                                        <div key={f} className={!notes[f]?"print-field-empty":""}>
                                          <div style={{fontSize:9,color:"#4B5563",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>{l}</div>
                                          <input
                                            value={notes[f]||""}
                                            onChange={e=>updateNote(p.id,f,e.target.value)}
                                            placeholder={ph}
                                            style={{width:"100%",background:"#0d1117",border:"1px solid #1E2A3A",
                                              borderRadius:5,padding:"6px 9px",color:"#CBD5E1",fontSize:11,
                                              outline:"none",boxSizing:"border-box"}}/>
                                        </div>
                                      ))}
                                    </div>
                                    <div className={!notes.extra?"print-field-empty":""}>
                                      <div style={{fontSize:9,color:"#4B5563",fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Extra Notes</div>
                                      <textarea
                                        value={notes.extra||""}
                                        ref={el=>{if(el){el.style.height="auto";el.style.height=el.scrollHeight+"px";}}}
                                        onChange={e=>{
                                          updateNote(p.id,"extra",e.target.value);
                                          e.target.style.height="auto";
                                          e.target.style.height=e.target.scrollHeight+"px";
                                        }}
                                        placeholder="Key observations, edge cases, gotchas…"
                                        rows={1}
                                        style={{width:"100%",background:"#0d1117",border:"1px solid #1E2A3A",
                                          borderRadius:5,padding:"6px 9px",color:"#CBD5E1",fontSize:11,
                                          outline:"none",resize:"none",fontFamily:"inherit",
                                          boxSizing:"border-box",overflow:"hidden",minHeight:"32px",lineHeight:"1.5"}}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        {filtered.length===0&&<div style={{textAlign:"center",color:"#374151",padding:"60px 0",fontSize:13}}>No problems match your filters.</div>}
      </div>
    </div>
  );
}
