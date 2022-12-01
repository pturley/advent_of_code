package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {

	dat, err := os.ReadFile("./input1.txt")
	check(err)
	lines := strings.Split(string(dat), "\n")

	var totals []int
	current_total := 0
	for _, line := range lines {
		if line == "" {
			totals = append(totals, current_total)
			current_total = 0
		} else {
			line_int, err := strconv.Atoi(line)
			check(err)
			current_total += line_int
		}
	}
	sort.Ints(totals)
	sort.Sort(sort.Reverse(sort.IntSlice(totals)))

	fmt.Println(totals[0])
	fmt.Println(totals[0] + totals[1] + totals[2])

}
