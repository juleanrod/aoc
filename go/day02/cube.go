package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type GameSet struct {
    red int
    green int
    blue int
}

func main() {
    filename := os.Args[1]

    file, err := os.Open(filename)

    if err != nil {
        log.Fatal(err)
    }
    defer file.Close();

    scanner := bufio.NewScanner(file);

    i := 1
    possibleGamesIDTotal := 0
    for scanner.Scan() {
        line := scanner.Text()
        s := strings.Split(line, ";")
        flag := true

        for j := range s {
            red, green, blue := sumColorValues(s[j])
            if red > 12 || green > 13 || blue > 14 {
                flag = false
                break
            }
        }
        
        if flag == true {
            possibleGamesIDTotal += i
        }
        i++
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Total IDs(possible games): %d\n", possibleGamesIDTotal)

}

func sumColorValues(text string) (int, int, int) {
    colorRegex := regexp.MustCompile(`(\d+)\s([a-z]+)`)
    colorCount := map[string]int{
        "red":   0,
        "green": 0,
        "blue":  0,
    }

    matches := colorRegex.FindAllStringSubmatch(text, -1)
    for _, match := range matches {
        count, _ := strconv.Atoi(match[1])
        color := match[2]
        colorCount[color] += count
    }
	return colorCount["red"], colorCount["green"], colorCount["blue"]
}

