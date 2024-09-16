---
layout: post
title: Counting Sort
description: A non-comparison-based sorting algorithm
author: kalam
date: 2024-09-14 13:43:24 +0600
categories: [Algorithm, Sorting]
tags: [sorting, counting-sort]
---

## Introduction

Counting Sort is a non-comparison-based sorting algorithm that is effective when the range of input values is limited. It performs particularly well when the range of input values is small relative to the number of elements to be sorted. The core concept of Counting Sort is to count the frequency of each distinct element in the input array and use this information to place the elements in their correct sorted positions.

## Algorithm

- Declare an auxiliary array `count` array of size `max(nums[])+1` and initialize it with `0`.
- Traverse array `nums` array and map each element of `nums` as an index of `count` array, i.e., execute `count[nums[i]]++` for `0 <= i < n`.
- Calculate the prefix sum at every index of array `nums`.
- Create an array `sortedNums` of size `n`.
- Traverse array `nums` and update `sortedNums[count[nums[i]] - 1] = nums[i]`. Also, update `count[nums[i]] = count[nums[i]] - 1` .

## Example


## Code

```cpp
#include <iostream>
#include <vector>
#include <cstdio>
#include <algorithm>

using namespace std;
#define scan(n) scanf("%d", &n)
#define print(n) printf("%d", n);
#define space() printf(" ");
#define newLine() printf("\n");
#define FOR(i, a, b) for (int i = a; i <= b; i++)
#define ReverseFor(i, a, b) for (int i = a; i >= b; i--)

void countingSort(vector<int> &nums)
{
    int n = nums.size();
    int maxNum = *max_element(nums.begin(), nums.end());

    vector<int> count(maxNum + 1, 0);

    FOR(i, 0, n - 1)
    {
        count[nums[i]]++;
    }
    FOR(i, 1, maxNum)
    {
        count[i] += count[i - 1];
    }

    vector<int> sortedNums(n);

    ReverseFor(i, n - 1, 0)
    {
        sortedNums[count[nums[i]] - 1] = nums[i];
        count[nums[i]]--;
    }

    nums = sortedNums;
}

int main()
{
#ifndef ONLINE_JUDGE
    freopen("IO/input.txt", "r", stdin);
    freopen("IO/output.txt", "w", stdout);
#endif // ONLINE_JUDGE

    int n, totalCase;
    scan(totalCase);
    FOR(cs, 1, totalCase)
    {
        scan(n);
        vector<int> nums(n);

        FOR(i, 0, n - 1)
        {
            scan(nums[i]);
        }

        countingSort(nums);

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

## Complexity Analysis

### Time Complexity

`O(n+m)`, where n and m are the size of `nums[]` and `count[]` respectively.

- **Best Case**: `Ω(n+m)`.
- **Average Case**: `θ(n+m)`.
- **Worst Case**: `O(n+m)`.

### Space Complexity
- `O(n+m)`, where n and m are the size of `nums[]` and `count[]` respectively.


## Advantages of Couting Sort

- Counting sort generally performs faster than all comparison-based sorting algorithms, such as merge sort and quicksort, if the range of input is of the order of the number of input.
- Counting sort is easy to code.
- Counting sort is a stable algorithm.

## Disadvantages of Couting Sort

- Counting sort doesn’t work on decimal values.
- Counting sort is inefficient if the range of values to be sorted is very large.
- Counting sort is not an In-place sorting algorithm, It uses extra space for sorting the array elements.

