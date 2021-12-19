package main

import (
	"fmt"
	"log"
	"os/exec"
)

func execBash() {
	cmd := exec.Command("/bin/sh", "./create-env.sh")

	out, err := cmd.Output()

	if err != nil {
		log.Fatalf(err.Error(), "error was appeared")
	}

	fmt.Print(string(out))

}

func main() {
	execBash()
}
