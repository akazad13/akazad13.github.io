---
layout: post
title: Quick Sort
description: A sorting algorithm that follows the divide-and-conquer approach
author: kalam
date: 2024-09-14 13:43:24 +0600
categories: [Algorithm, Sorting]
tags: [sorting, quick-sort, divide and conquer]
---
QuickSort is a sorting algorithm that follows the divide-and-conquer approach. It selects an element as the pivot and partitions the given array around this pivot, placing the pivot in its correct position in the sorted array.

The key process in QuickSort is the partition() function. The goal of the partition is to place the pivot (any chosen element) in its correct position in the sorted array, with all smaller elements to the left and all greater elements to the right of the pivot.

This partitioning is done recursively on each side of the pivot after it is placed in its correct position, ultimately sorting the entire array.

### Example


### Code

```cpp
#include <iostream>
#include <vector>
#include <cstdio>

using namespace std;
#define scan(n) scanf("%d", &n)
#define print(n) printf("%d", n);
#define space() printf(" ");
#define newLine() printf("\n");
#define FOR(i, a, b) for (int i = a; i <= b; i++)

int partition(vector<int> &nums, int left, int right)
{
    // Seleting last element as a pivot
    int pivot = nums[right];
    int i = left - 1;

    // move all the elements less than and equal to the pivot to the left side
    // and the elements greater than to the right side
    FOR(j, left, right - 1)
    {
        if (nums[j] <= pivot)
        {
            i++;
            swap(nums[i], nums[j]);
        }
    }

    swap(nums[i + 1], nums[right]);

    return i + 1;
}

void quickSort(vector<int> &nums, int begin, int end)
{
    if (begin < end)
    {
        // Partition the array and get the pivot index
        int partitionIndex = partition(nums, begin, end);

        // Recursively sort the two partitions
        quickSort(nums, begin, partitionIndex - 1);
        quickSort(nums, partitionIndex + 1, end);
    }
    return;
}

int main()
{
#ifndef ONLINE_JUDGE
    freopen("IO/input.txt", "r", stdin);
    freopen("IO/output.txt", "w", stdout);
#endif // ONLINE_JUDGE

    int n, totalCase;
    vector<int> nums(100005);

    scan(totalCase);
    FOR(cs, 1, totalCase)
    {
        scan(n);

        FOR(i, 0, n - 1)
        {
            scan(nums[i]);
        }

        quickSort(nums, 0, n - 1);

        FOR(i, 0, n - 1)
        {
            print(nums[i]);
            space();
        }
        newLine();
    }
    return 0;
}

```

### Complexity Analysis:

##### Time Complexity:

- **Best Case**: `Ω(nlogn)`, when the pivot chosen at each step divides the array into roughly equal halves. In this case, the algorithm creates balanced partitions, leading to efficient sorting.
- **Average Case**: `θ(nlogn)`, Quicksort's average-case performance is typically very good in practice, making it one of the fastest sorting algorithms.
- **Worst Case**: `O(n^2)`, when the pivot at each step consistently results in highly unbalanced partitions, such as when the array is already sorted and the pivot is always chosen as the smallest or largest element. To mitigate the worst-case scenario, various techniques are used, such as choosing a good pivot (e.g., median of three) and using a randomized algorithm (Randomized Quicksort) to shuffle the elements before sorting.

##### Space Complexity:
- `O(1)`, If we don't consider the recursive stack space. If we do consider the recursive stack space, then in the worst case, quicksort could use `O(n)` space.


### Advantages of Quick Sort:

- It is a divide-and-conquer algorithm that simplifies problem-solving.
- It is efficient on large data sets.
- It has a low overhead, requiring only a small amount of memory to function.

### Disadvantages of Quick Sort:

- It has a worst-case time complexity of O(N²) when the pivot is chosen poorly.
- It is not a good choice for small data sets.
- It is not a stable sort, meaning that if two elements have the same key, their relative order will not be preserved in the sorted output, as elements are swapped according to the pivot’s position without considering their original positions.
