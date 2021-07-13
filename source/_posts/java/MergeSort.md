---
title: 归并排序
author: mirsery
date: 2016-04-05
tags: 
  - 排序
categories: 
  - java
---

#MergeSort
The algorithms that we consider in this section are based on a simple operation known as merging: combining two ordered arrays to make one larger ordered array. This operation immediately leads to a simple recursive sort method known as merge- sort: to sort an array, divide it into two halves, sort the two halves (recursively), and then merge the results. As you will see, one of mergesort’s most attractive properties is that it guarantees to sort any array of N items in time proportional to N log N. Its prime disadvantage is that it uses extra space proportional to N.
##Abstract in-place merge
The straightforward approach to implementing merg- ing is to design a method that merges two disjoint ordered arrays of Comparable ob- jects into a third array. This strategy is easy to implement: create an output array of the requisite size and then choose successively the smallest remaining item from the two
input arrays to be the next item added to the output array.
However, when we mergesort a large array, we are doing a huge number of merges,
so the cost of creating a new array to hold the output every time that we do a merge is problematic. It would be much more desirable to have an in-place method so that we could sort the first half of the array in place, then sort the second half of the array in place, then do the merge of the two halves by moving the items around within the ar- ray, without using a significant amount of other extra space. It is worthwhile to pause momentarily to consider how you might do that. At first blush, this problem seems to be one that must be simple to solve, but solutions that are known are quite complicated, especially by comparison to alternatives that use extra space.
Still, the abstraction of an in-place merge is useful. Accordingly, we use the method signaturemerge(a, lo, mid, hi)tospecifyamergemethodthatputstheresultof merging the subarrays a[lo..mid] with a[mid+1..hi] into a single ordered array, leaving the result in a[lo..hi]. The code on the next page implements this merge method in just a few lines by copying everything to an auxiliary array and then merging back to the original. 
```java
public static void merge(Comparable[] a, int lo, int mid, int hi)
  {  // Merge a[lo..mid] with a[mid+1..hi].
     int i = lo, j = mid+1;
     for (int k = lo; k <= hi; k++)  // Copy a[lo..hi] to aux[lo..hi].
        aux[k] = a[k];
     for (int k = lo; k <= hi; k++)  // Merge back to a[lo..hi].
        if      (i > mid)              a[k] = aux[j++];
        else if (j > hi )              a[k] = aux[i++];
        else if (less(aux[j], aux[i])) a[k] = aux[j++];
        else                           a[k] = aux[i++];
  }
```
This method merges by first copying into the auxiliary array aux[] then merging back to a[]. In the merge (the second for loop), there are four conditions: left half exhausted (take from the right), right half exhausted (take from the left), current key on right less than current key on left (take from the right), and current key on right greater than or equal to current key on left (take from the left).
##Top-down mergesort 
It is one of the best-known examples of the utility of the divide-and-conquer paradigm for efficient algorithm design. This recursive code is the basis for an inductive proof that the algorithm sorts the array: if it sorts the two subarrays, it sorts the whole array, by merg- ing together the subarrays.
To understand mergesort, it is worthwhile to consider carefully the dynamics of the method calls, shown in the trace at right. To sort a[0..15], the sort() method calls itself to sort a[0..7] then calls itself to sort a[0..3] and a[0..1] before finally doing the first merge of a[0] with a[1] after calling itself to sort a[0] and then a[1] (for brevity, we omit the calls for the base-case 1-entry sorts in the trace). Then the next merge is a[2] with a[3] and then a[0..1] with a[2..3] and so forth. From this trace, we see that the sort code simply provides an orga- nized way to sequence the calls to the merge() method. This insight will be useful later in this section.
The recursive code also provides us with the basis for analyzing mergesort’s running time. Because mergesort is a prototype of the divide-and-conquer algorithm de- sign paradigm, we will consider this analysis in detail.
```java

  public class Merge
  {
     private static Comparable[] aux;      // auxiliary array for merges
     public static void sort(Comparable[] a)
     {
        aux = new Comparable[a.length];    // Allocate space just once.
        sort(a, 0, a.length - 1);
     }
     private static void sort(Comparable[] a, int lo, int hi)
     {  // Sort a[lo..hi].
        if (hi <= lo) return;
        int mid = lo + (hi - lo)/2;
        sort(a, lo, mid);       // Sort left half.
        sort(a, mid+1, hi);     // Sort right half.
        merge(a, lo, mid, hi);  // Merge results (code on page 271).
} }
```
##Use insertion sort for small subarrays. 
We can improve most recursive algorithms by handling small cases differently, because the recursion guarantees that the method will be used often for small cases, so improvements in handling them lead to improvements in the whole algorithm. In the case of sorting, we know that insertion sort (or selection sort) is simple and therefore likely to be faster than mergesort for tiny subarrays. As usual, a visual trace provides insight into the operation of mergesort. The visual trace on the facing page shows the operation of a mergesort implementation with a cutoff for small subarrays. Switching to insertion sort for small subarrays (length 15 or less, say) will improve the running time of a typical mergesort implementation by 10 to 15 percent (see Exercise 2.2.23).
Test whether the array is already in order. We can reduce the running time to be linear for arrays that are already in order by adding a test to skip the call to merge() if a[mid] is less than or equal to a[mid+1]. 
##Eliminatethecopytotheauxiliaryarray. 
It is possible to eliminate the time(but not the space) taken to copy to the auxiliary array used for merging. To do so, we use two invocations of the sort method: one takes its input from the given array and puts the sorted output in the auxiliary array; the other takes its input from the auxiliary array and puts the sorted output in the given array. 

![](./_image/屏幕快照 2017-01-28 00.54.31.png)
It is appropriate to repeat here a point raised in Chapter 1 that is easily forgotten and needs reemphasis. Locally, we treat each algorithm in this book as if it were critical in some application. Globally, we try to reach general conclusions about which approach to recommend. Our discussion of such improvements is not necessarily a recommen- dation to always implement them, rather a warning not to draw absolute conclusions about performance from initial implementations. When addressing a new problem, your best bet is to use the simplest implementation with which you are comfortable and then refine it if it becomes a bottleneck. Addressing improvements that decrease running time just by a constant factor may not otherwise be worthwhile. You need to test the effectiveness of specific improvements by running experiments, as we indicate in exercises throughout.
In the case of mergesort, the three improvements just listed are simple to implement and are of interest when mergesort is the method of choice—for example, in situations discussed at the end of this chapter.
##Bottom-up mergesort 
The recursive implementation of mergesort is prototypi- cal of the divide-and-conquer algorithm design paradigm, where we solve a large prob- lem by dividing it into pieces, solving the subproblems, then using the solutions for the pieces to solve the whole problem. Even though we are thinking in terms of merging together two large subarrays, the fact is that most merges are merging together tiny subarrays. Another way to implement mergesort is to organize the merges so that we do all the merges of tiny subarrays on one pass, then do a second pass to merge those sub- arrays in pairs, and so forth, continuing until we do a merge that encompasses the whole array. This method requires even less code than the standard recursive implementation. We start by doing a pass 2 of 1-by-1 merges (considering individual items as subarrays of size 1), then a pass of 2-by-2 merges (merge subarrays of size 2 to make subarrays of size 4), then 4-by-4 merges, and so forth. The sec- ond subarray may be smaller than the first in the last merge on each pass (which is no problem for merge()), but otherwise all merges involve subar- rays of equal size, doubling the sorted subarray size for the next pass.
```java
public class MergeBU
  {
     private static Comparable[] aux;      // auxiliary array for merges
     // See page 271 for merge() code.
     public static void sort(Comparable[] a)
     {  // Do lg N passes of pairwise merges.
 } }
int N = a.length;
aux = new Comparable[N];
for (int sz = 1; sz < N; sz = sz+sz)
                                         // sz: subarray size
for (int lo = 0; lo < N-sz; lo += sz+sz) // lo: subarray index
merge(a, lo, lo+sz-1, Math.min(lo+sz+sz-1, N-1));
```
```java

 * Created by mirsery on 2017/1/20.
 */
public class MergeSort {
        public void Merge(int[] array, int low, int mid, int high) {

            int i = low; // i是第一段序列的下标

            int j = mid + 1; // j是第二段序列的下标

            int k = 0; // k是临时存放合并序列的下标

            int[] array2 = new int[high - low + 1]; // array2是临时合并序列

            // 扫描第一段和第二段序列，直到有一个扫描结束
            while (i <= mid && j <= high) {
                // 判断第一段和第二段取出的数哪个更小，将其存入合并序列，并继续向下扫描
                if (array[i] <= array[j]) {
                    array2[k] = array[i];
                    i++;
                    k++;
                } else {
                    array2[k] = array[j];
                    j++;
                    k++;
                }
            }

            // 若第一段序列还没扫描完，将其全部复制到合并序列
            while (i <= mid) {
                array2[k] = array[i];
                i++;
                k++;
            }

            // 若第二段序列还没扫描完，将其全部复制到合并序列
            while (j <= high) {
                array2[k] = array[j];
                j++;
                k++;
            }

            // 将合并序列复制到原始序列中
            for (k = 0, i = low; i <= high; i++, k++) {
                array[i] = array2[k];
            }

        }

        public void MergePass(int[] array, int gap, int length) {
            int i = 0;

            // 归并gap长度的两个相邻子表
            for (i = 0; i + 2 * gap - 1 < length; i = i + 2 * gap) {
                Merge(array, i, i + gap - 1, i + 2 * gap - 1);
            }

            // 余下两个子表，后者长度小于gap
            if (i + gap - 1 < length) {
                Merge(array, i, i + gap - 1, length - 1);
            }

        }

        public int[] sort(int[] list) {
            for (int gap = 1; gap < list.length; gap = 2 * gap) {
                MergePass(list, gap, list.length);
                System.out.print("gap = " + gap + ":\t");
                this.printAll(list);
            }
            return list;
        }

        // 打印完整序列
        public void printAll(int[] list) {
            for (int value : list) {
                System.out.print(value + "\t");
            }
            System.out.println();
        }

        public static void main(String[] args) {

            int[] array = {
               9,1,5,3,4,2,6,8,7
            };

            MergeSort merge = new MergeSort();
            System.out.print("排序前:\t\t");
            merge.printAll(array);

            merge.sort(array);
            System.out.print("排序后:\t\t");
            merge.printAll(array);
        }
}
```