---
layout: post
title: Radix Sort
description: linear sorting algorithm that sorts elements by processing them digit by digit
author: kalam
date: 2024-09-14 17:58:00 +0600
categories: [Algorithm, Sorting]
tags: [sorting, radix-sort]
---
Radix Sort is a linear sorting algorithm that sorts elements by processing them digit by digit. It is an efficient sorting algorithm for integers or strings with fixed-size keys. 

Instead of comparing elements directly, Radix Sort distributes the elements into buckets based on the value of each digit. By repeatedly sorting the elements by their digits, starting from the least significant to the most significant, Radix Sort achieves the final sorted order.

The key idea behind Radix Sort is to leverage the concept of place value. It assumes that sorting numbers digit by digit will eventually yield a fully sorted list. Radix Sort can be implemented using different approaches, such as Least Significant Digit (LSD) Radix Sort or Most Significant Digit (MSD) Radix Sort.

### Example


### Code

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

void countingSortByDigit(vector<int> &nums, int exponent)
{
    int n = nums.size();
    int maxNum = 9;

    vector<int> counts(maxNum + 1, 0);

    FOR(i, 0, maxNum)
    {
        counts[i] = 0;
    }

    FOR(i, 0, n - 1)
    {
        int digit = (nums[i] / exponent) % 10;
        counts[digit]++;
    }
    FOR(i, 1, maxNum)
    {
        counts[i] += counts[i - 1];
    }

    vector<int> sortedNums(n);

    ReverseFor(i, n - 1, 0)
    {
        int digit = (nums[i] / exponent) % 10;
        sortedNums[counts[digit] - 1] = nums[i];
        counts[digit]--;
    }

    FOR(i, 0, n - 1)
    {
        nums[i] = sortedNums[i];
    }

    return;
}

void radixsort(vector<int> &nums)
{
    int maxNum = *max_element(nums.begin(), nums.end());

    int exp = 1;
    while (maxNum / exp > 0)
    {
        countingSortByDigit(nums, exp);
        exp *= 10;
    }
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

        radixsort(nums);

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

`O(d*(n+b))`, where `d` is the number of digits, `n` is the number of elements, and `b` is the base of the number system being used.

- **Best Case**: `Ω(d*(n+b))`.
- **Average Case**: `θ(d*(n+b))`.
- **Worst Case**: `O(d*(n+b))`.

##### Space Complexity:
- `O(n+b)`, where `n` is the number of elements and `b` is the base of the number system.


### Use cases
- When values are in the range from `1` to `n^2`.

