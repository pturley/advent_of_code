file = File.open("input.txt")
depths = file.readlines.map(&:chomp).map(&:to_i)

part1_count = 0
depths.each_cons(2) do |depth_pair|
  part1_count += 1 if depth_pair[0] < depth_pair[1]
end

puts "Part 1: #{part1_count}"

part2_count = 0
depths.each_cons(4) do |depths_for_compare|
  part2_count += 1 if depths_for_compare.take(3).sum < depths_for_compare[1..-1].sum
end

puts "Part 2: #{part2_count}"
