import sys, getopt
import subprocess
import datetime

def to_base_26(n, l = 2):
    out = []
    while n > 0:
        out = [n % 26] + out
        n = n // 26

    out = [0] * (l - len(out)) + out
    return "".join(list(map(lambda n: chr(n + 65), out)))

def to_base_10(n):
    out = 0
    exp = 0

    for c in n[::-1]:
        out += (ord(c) - 65) * 26**exp
        exp += 1

    return out

def luhn_checksum(n):
    factor = 2
    csum = 0

    for c in n[::-1]:
        addend = (ord(c) - 65) * factor
        factor = 1 if factor == 2 else 2
        addend = addend // 26 + addend % 26
        csum += addend

    remainder = csum % 26
    val = (26 - remainder) % 26
    return chr(val + 65)

def check_luhn_checksum(n):
    factor = 1
    csum = 0

    for c in n[::-1]:
        addend = (ord(c) - 65) * factor
        factor = 1 if factor == 2 else 2
        addend = addend // 26 + addend % 26
        csum += addend

    remainder = csum % 26
    return remainder == 0

def main(argv):
    team = 'T'
    art_id = 'XXX'

    try:
        opts, args = getopt.getopt(argv,"ht:i:",["team=","id="])
    except getopt.GetoptError:
        print ('create_article.py -t <team> -i <article-id>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print ('create_article.py -t <team> -i <article-id>')
            sys.exit()
        elif opt in ("-t", "--team"):
            team = arg[0].upper()
        elif opt in ("-i", "--id"):
            art_id = arg[0:3].upper()

    date = datetime.datetime.now(datetime.UTC).timetuple()
    day = date.tm_yday - 1
    year = date.tm_year - 1970

    label = team + to_base_26(year) + to_base_26(day) + art_id
    label += luhn_checksum(label)

    subprocess.run([f"hugo new content archives/{label}/index.md"], shell=True)

if __name__ == "__main__":
   main(sys.argv[1:])