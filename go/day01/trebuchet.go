package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
    "strconv"
)


func main() {

    filename := os.Args[1]

    file, err := os.Open(filename)

    if err != nil {
        log.Fatal(err)
    }
    defer file.Close();

    scanner := bufio.NewScanner(file);

    totalCalibration := 0

    for scanner.Scan() {
        line := scanner.Text()
        value := findFirstLastInt(line)
        totalCalibration += value
    }

    if err := scanner.Err(); err != nil {
        log.Fatal(err)
    }

    fmt.Printf("Newly-improved trebuchet calibration is : %v\n", totalCalibration)

}

func findFirstLastInt(line string) int {

    var first, second string

    i, j := 0, len(line) - 1
    for i < len(line) {
        if isInteger(line[i]) == true {
            first = string(line[i])
            break
        }
        i++

    }

    for j >= i {
        if isInteger(line[j]) == true {
            second = string(line[j])
            break
        }
        j--

    }

    valueInt, _ := strconv.Atoi(first + second)
    return valueInt
}

func isInteger(b byte) bool {
    _, err := strconv.Atoi(string(b))
    return err == nil
}
