---
title: AVL树二
toc: true
author: mirsery
comments: true
date: 2023-10-24 09:06:02
updated: 2023-10-24 09:06:02
tags:
    - 数据结构
categories:
    - 算法和数据结构
excerpt: 'AVL树（Adelson-Velsky and Landis Tree）是计算机科学中最早被发明的自平衡二叉查找树。java实现avl树...'
---


<!-- toc -->

## 节点Node的定义

```java
    class Node {
        public K key;       // 节点key值
        public V value;     // 节点值
        public Node left;   // 左子树节点
        public Node right;  // 右子树节点
        public int height;  // 高度

        public Node(K key, V value) {
            this.key = key;
            this.value = value;
            this.height = 1;
            left = null;
            right = null;
        }
    }
```

## AVL 树的结构定义
```java
public class AVLTree<K extends Comparable<K>, V> {
    
    private Node root;  // 根节点 

    private int size;   // 节点数

    public AVLTree() {
        root = null;
        size = 0;
    }
    ...
}
```
## AVL树的方法

```java

    /**
     * 获取节点高度
     **/
    private int getHeight(Node node) {
        if (node==null) {
            return 0;
        }
        return node.height;
    }


    /**
     * 计算平衡因子
     **/
    private int getBalanceFactor(Node node) {
        if (node==null) {
            return 0;
        }
        return getHeight(node.left) - getHeight(node.right);
    }

    /* 二分搜索树
     *
     * 二分搜索树 所有节点满足，左节点小于根节点，右节点大于根节点
     */
    public boolean isBST() {
        ArrayList<K> keys = new ArrayList<>();
        inOrder(root, keys);
        for (int i = 1; i < keys.size(); i++) {
            if (keys.get(i - 1).compareTo(keys.get(i)) > 0) {
                return false;
            }
        }
        return true;
    }


    private void inOrder(Node node, ArrayList<K> keys) {
        if (node==null) {
            return;
        }
        inOrder(node.left, keys);
        keys.add(node.key);
        inOrder(node.right, keys);
    }

    public boolean isBalanced(){
        return isBalanced(root);
    }

    /*
     * 判断Node为根的二叉树是否平衡 即平衡因子绝对值小于2
     */
    public boolean isBalanced(Node node) {
        if (node==null) {
            return true;
        }
        int balanceFactor = getBalanceFactor(node);
        if (Math.abs(balanceFactor) > 1) {
            return false;
        }
        return isBalanced(node.left) && isBalanced(node.right);
    }

    public void add(K key, V value) {
        root = add(root, key, value);
    }

    private Node add(Node node, K key, V value) {
        if (node==null) {
            size++;
            return new Node(key, value);
        }
        if (key.compareTo(node.key) < 0) {
            node.left = add(node.left, key, value);
        } else if (key.compareTo(node.key) > 0) {
            node.right = add(node.right, key, value);
        } else {
            node.value = value;
        }

        node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));

        int balanceFactor = getBalanceFactor(node);

        /* 判断所属情况是LL LR RL RR等情形 */

        // LL 整体顺时针旋转
        if (balanceFactor > 1 && getBalanceFactor(node.left) >= 0) {
            return rightRotate(node);
        }

        //RR 整体逆时针旋转
        if (balanceFactor < -1 && getBalanceFactor(node.right) <= 0) {
            return leftRotate(node);
        }

        //LR 左子树左旋转 转化成 LL，之后整体右旋转
        if (balanceFactor > 1 && getBalanceFactor(node.left) < 0) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }

        //RL 右子树右旋转转化成 RR ，之后整体左旋转
        if (balanceFactor < -1 && getBalanceFactor(node.right) > 0) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }

    // 右旋转 顺时针
    /*
     *              y                   x
     *             / \                 / \
     *            T1  x     ----->    y   T3
     *               / \             / \
     *              T2  T3          T1 T2
     */
    private Node rightRotate(Node y) {
        Node x = y.left;
        Node T3 = x.right;
        x.right = y;
        y.left = T3;

        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        return x;
    }

    // 左旋转 逆时针
    private Node leftRotate(Node y) {
        Node x = y.right;
        Node T2 = x.left;
        y.right = T2;
        x.left = y;

        y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
        x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
        return x;
    }

    /**
     * @param node 树根节点
     * @param key  节点属性
     * @return key 所在的节点
     **/
    private Node getNode(Node node, K key) {
        if (node==null) {
            return null;
        }
        if (key.equals(node.key)) {
            return node;
        } else if (key.compareTo(node.key) < 0) {
            return getNode(node.left, key);
        } else {
            return getNode(node.right, key);
        }
    }


    public boolean contains(K key) {
        return getNode(root, key)!=null;
    }

    public V get(K key) {
        Node node = getNode(root, key);
        return node==null ? null : node.value;
    }

    public void set(K key, V newVal) {
        Node node = getNode(root, key);
        if (node==null) {
            throw new IllegalArgumentException(key + " 不存在");
        }
        node.value = newVal;
    }

    /**
     * 返回node为根的二分搜索树的最小值所在的节点
     */
    private Node minimum(Node node) {
        if (node.left==null) {
            return node;
        }
        return minimum(node.left);
    }

    /**
     * 删除最小节点
     *
     * @return Node 返回新树的根节点
     **/
    private Node removeMin(Node node) {
        if (node.left==null) {
            Node rightNode = node.right;
            node.right = null;
            size--;

            return rightNode;
        }
        node.left = removeMin(node.left);
        return node;
    }


    private Node remove(Node node, K key) {
        if (node==null) {
            return null;
        }
        Node retNode;
        if (key.compareTo(node.key) < 0) {
            node.left = remove(node.left, key);
            retNode = node;
        } else if (key.compareTo(node.key) > 0) {
            node.right = remove(node.right, key);
            retNode = node;
        } else {
            //  1.左子树为空
            if (node.left==null) {
                Node rightNode = node.right;
                node.right = null;
                size--;
                retNode = rightNode;
            } else if (node.right==null) {
                Node leftNode = node.left;
                node.left = null;
                size--;
                retNode = leftNode;
            } else {

                Node successor = minimum(node.right);
                successor.right = remove(node.right, successor.key);
                successor.left = node.left;
                node.left = node.right = null;
                retNode = successor;
            }

            if (retNode==null) {
                return null;
            }
            retNode.height = 1 + Math.max(getHeight(retNode.left), getHeight(retNode.right));

            int balanceFactor = getBalanceFactor(retNode);

            //LL
            if(balanceFactor > 1 && getBalanceFactor(retNode.left) >= 0 ){
                return rightRotate(retNode);
            }
            
            //RR
            if(balanceFactor < -1 && getBalanceFactor(retNode.right) <= 0 ){
                return leftRotate(retNode);
            }

            //LR
            if(balanceFactor > 1 && getBalanceFactor(retNode.left) < 0){
                retNode.left = leftRotate(retNode.left);
                return rightRotate(retNode);
            }

            //RL
            if(balanceFactor < -1 && getBalanceFactor(retNode.right) > 0){
                retNode.right = rightRotate(retNode.right);
                return leftRotate(retNode);
            }
        }

        return retNode;
    }
```