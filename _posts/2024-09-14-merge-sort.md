---
layout: post
title: Merge Sort
description: A sorting algorithm that follows the divide-and-conquer approach
author: kalam
date: 2024-09-14 13:43:24 +0600
categories: [Algorithm, Sorting]
tags: [sorting, merge-sort, divide and conquer]
---
Merge sort is a sorting algorithm that follows the divide-and-conquer approach. It works by recursively dividing the input array into smaller subarrays and sorting those subarrays, then merging them back together to obtain the sorted array.

So, the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. This process is repeated until the entire array is sorted.

#### Here’s a step-by-step explanation of how merge sort works:

1. Divide: Recursively split the list or array into two halves until they cannot be divided further.

2. Conquer: Sort each subarray individually using the merge sort algorithm.

3. Merge: Combine the sorted subarrays back together in order. Continue this process until all elements from both subarrays are merged.

### Example

    Input:  48 38 27 43 10 30
    Output: 10 27 30 38 43 48

![1](https://github.com/user-attachments/assets/6c2ee25a-34d8-460a-9fd0-d84595e55f74)

![2](https://github.com/user-attachments/assets/e9feec37-0659-46fe-b332-c4a9c7cc2396)

![3](https://github.com/user-attachments/assets/13ebaa66-b6cd-490f-9d53-c6d1f4c18ef7)

![4](https://github.com/user-attachments/assets/2baa0777-a222-422a-beaf-770f4ab13cfb)

![5](https://github.com/user-attachments/assets/337330b0-a936-420d-bc67-90014a657700)

![6](https://github.com/user-attachments/assets/97be4f0f-46e3-479d-9d44-a8c23bc82129)

![7](https://github.com/user-attachments/assets/e5368505-9cd4-4d81-b9c1-4c08948c5cb3)

![8](https://github.com/user-attachments/assets/176d51cb-aa38-446c-9716-147b0771b29d)

![9](https://github.com/user-attachments/assets/b07a5034-11b5-4d6a-b9e3-048919bf0e6b)

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

void merge(vector<int> &nums, int left, int mid, int right)
{
    // decare left and right subarray indices
    int const leftSubArraySize = mid - left + 1;
    int const rightSubArraySize = right - mid;

    // declare and initialize left and right subarrays
    auto *leftSubArray = new int[leftSubArraySize],
         *rightSubArray = new int[rightSubArraySize];

    // copy data to left subarray
    FOR(i, 0, leftSubArraySize - 1)
    {
        leftSubArray[i] = nums[left + i];
    }

    // copy data to right subarray
    FOR(i, 0, rightSubArraySize - 1)
    {
        rightSubArray[i] = nums[mid + 1 + i];
    }

    int currIndexOfRightSubArray = 0;
    int currIndexOfMergeArray = left;

    // Merge the two subarrays into the original array
    FOR(i, 0, leftSubArraySize - 1)
    {
        if (currIndexOfRightSubArray >= rightSubArraySize)
        {
            nums[currIndexOfMergeArray++] = leftSubArray[i];
        }
        else
        {
            while (
                currIndexOfRightSubArray < rightSubArraySize && rightSubArray[currIndexOfRightSubArray] <= leftSubArray[i])
            {
                nums[currIndexOfMergeArray++] = rightSubArray[currIndexOfRightSubArray++];
            }
            nums[currIndexOfMergeArray++] = leftSubArray[i];
        }
    }

    // Deallocate memory
    delete[] leftSubArray;
    delete[] rightSubArray;
    return;
}

void mergeSort(vector<int> &nums, int begin, int end)
{
    if (begin < end)
    {
        // get the middle of the partition
        int mid = begin + (end - begin) / 2;

        // Sort both halves recursively
        mergeSort(nums, begin, mid);
        mergeSort(nums, mid + 1, end);

        // Merge the sorted halves into the original array
        merge(nums, begin, mid, end);
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

        mergeSort(nums, 0, n - 1);

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

- **Best Case**: `Ω(nlogn)`, When the array is already sorted or nearly sorted.
- **Average Case**: `θ(nlogn)`, When the array is randomly ordered.
- **Worst Case**: `O(nlogn)`, When the array is sorted in reverse order.

##### Space Complexity:
- `O(n)`, Additional space is required for the temporary array used during merging.

### Advantages of Merge Sort:

- Stability: Merge sort is a stable sorting algorithm, meaning it preserves the relative order of equal elements in the input array.
- Guaranteed Worst-Case Performance: Merge sort has a worst-case time complexity of `O(nlogn)`, ensuring good performance even on large datasets.
- Simple to Implement: The divide-and-conquer approach used in merge sort is straightforward and easy to implement.

### Disadvantages of Merge Sort:

- Space Complexity: Merge sort requires additional memory to store the merged sub-arrays during the sorting process.
- Not In-Place: Merge sort is not an in-place sorting algorithm, meaning it needs extra memory to store the sorted data. This can be a disadvantage in applications where memory usage is a concern.

