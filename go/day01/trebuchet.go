package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
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

    stoi := map[string]string {
        "one": "1", "two": "2", "three": "3",
        "four": "4", "five": "5", "six": "6",
        "seven": "7", "eight": "8", "nine": "9",
    }

    m := map[byte][]string{
        'o': {"one"},
        't': {"two","three"},
        'f': {"four", "five"},
        's': {"six", "seven"},
        'e': {"eight"},
        'n': {"nine"},
    }

    // adding key, pairs to the map

    i, j := 0, len(line) - 1
    for i < len(line) {
        if isInteger(line[i]) == true {
            first = string(line[i])
            break
        }
        if s, ok := m[line[i]]; ok == true {
            lengthSlice := len(s)
            for k := 0; k < lengthSlice; k++ {
                current := s[k]
                if strings.HasPrefix(line[i:], current) == true {
                    first = stoi[current]
                    i += len(current) - 1
                    break
                }
            }
        }
        if(first != "") {
            break
        } 
        i++
    }
    
    for j >= i {
        if isInteger(line[j]) == true {
            second = string(line[j])
            break
        }
        if s, ok := m[line[j]]; ok == true {
            lengthSlice := len(s)
            for k := 0; k < lengthSlice; k++ {
                current := s[k]
                if(strings.HasPrefix(line[j:], current) == true) {
                    second = stoi[current]
                    break
                }
            }
        }
        if(second != "") {
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
