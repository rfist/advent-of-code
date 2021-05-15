package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	inputRaw, _ := ioutil.ReadFile("../input.txt")
	input := make([]int, len(inputRaw))
	for index, value := range strings.Split(string(inputRaw), "\n") {
		input[index], _ = strconv.Atoi(string(value))
	}
	fmt.Printf("Multiply result of the two entries from the report is %v \n", processPart1(input))
}

func processPart1(input []int) (result int) {
	for index1, sum1 := range input {
		for index2, sum2 := range input {
			if index1 != index2 && sum1+sum2 == 2020 {
				result = sum1 * sum2
				return
			}
		}
	}
	return
}
