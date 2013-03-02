def diff(a, b):
    a.sort()
    b.sort()
    elements = []
    while len(a) > 0 and len(b) > 0:
        if b[-1] > a[-1]:
            elements.append(b.pop())
        elif a[-1] > b[-1]:
            elements.append(a.pop())
        else:
            a.pop()
            b.pop()
    elements.extend(a)
    elements.extend(b)
    return elements

print(diff([2, 1], [8, 16, 2, 3]))
