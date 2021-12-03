file = File.open("input1.txt")
depths = file.readlines.map(&:chomp).map(&:to_i)

def part1()
  count = 0
  depths.each_cons(2) do |depth_pair|
    count += 1 if depth_pair[0] < depth_pair[1]
  end
  count
end

def part2()
  count = 0
  depths.each_cons(4) do |depths_for_compare|
    count += 1 if depths_for_compare.take(3).sum < depths_for_compare[1..-1].sum
  end
  count
end

puts "Part 1: #{part1()}"
puts "Part 2: #{part2()}"
