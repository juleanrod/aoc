package main

import (
	"bufio"
	"fmt"
	"log"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

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
    sumOfPowers := 0
    for scanner.Scan() {
        line := scanner.Text()
        s := strings.Split(line, ";")
        flag := true

        var red, green, blue int

        for j := range s {
            tempRed, tempGreen, tempBlue := sumColorValues(s[j])
            red = getMax(red, tempRed)
            green = getMax(green, tempGreen)
            blue = getMax(blue, tempBlue)
        }
        
        sumOfPowers += (red*green*blue)
        fmt.Printf("%d.Minimum set of cubes: r:%d, g:%d, b:%d; Power of set: %d\n", i, red, green,blue, sumOfPowers)
        if flag == true {
            possibleGamesIDTotal += i
        }
        i++
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Total IDs(possible games): %d\n", sumOfPowers)

}

func getMax(a, b int) int {
    return int(math.Max(float64(a), float64(b)))
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
        current := colorCount[color]
        colorCount[color] = int(math.Max(float64(current), float64(count)))
    }
    
    if colorCount["red"] == 0 { colorCount["red"] = 1 } 
    if colorCount["green"] == 0 { colorCount["green"] = 1 } 
    if colorCount["blue"] == 0 { colorCount["blue"] = 1 } 

	return colorCount["red"], colorCount["green"], colorCount["blue"]
}

