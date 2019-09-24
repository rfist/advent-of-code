package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

func main() {
	absPath, _ := filepath.Abs("./2015/02/input.txt")
	b, _ := ioutil.ReadFile(absPath)
	fmt.Println("rfist", b)
	//var test = "3x2x4"
	//result := process(string(b))
	//result2 := process2(string(b))
	//fmt.Println("Santa takes", result, "floor")
	//fmt.Println("Santa enters first the basement at",result2, "position");
}

func calculateSurface(input string)int {
	areas := strings.Split(input, "x")
	values := make([]int, 3)
	for i, v := range areas {
		var err error
		values[i], err = strconv.Atoi(v)
		if err != nil {
			fmt.Errorf("Something goes wrong", err)
		}
	}
	sort.Ints(values)
	surfaceA := values[0] * values[1] * 2
	surfaceB := values[1] * values[2] * 2
	surfaceC := values[0] * values[2] * 2
	additional := values[0] * values[1]
	total := surfaceA + surfaceB + surfaceC + additional
	return total
}
