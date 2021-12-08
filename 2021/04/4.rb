class Four
  def initialize()
    file = File.open("input4.txt")
    @lines = file.readlines.map(&:chomp)
    @calls = @lines[0].split(",")
    @boards = []
    @lines[1..-1].each do |line|
      if line == ""
        @boards << []
      else
        @boards.last << line.split(" ")
      end
    end
  end

  def is_winner?(board, called)
    board.any? { |row| row.all? { |c| called.include?(c) } } ||
    board.transpose.any? { |row| row.all? { |c| called.include?(c) } }
  end

  def score(board, called)
    board.flatten.reduce(0) { |a, e| a + (!called.include?(e) ? e.to_i : 0) } * called.last.to_i
  end

  def part1()
    called = []
    winner_board = nil
    @calls.each do |call|
      break unless winner_board.nil?
      called << call
      winner_board = @boards.find { |board| is_winner?(board, called) }
    end
    score(winner_board, called)
  end

  def part2()
    called = []
    potential_losers = @boards.dup
    @calls.each do |call|
      break if potential_losers.size == 1 && is_winner?(potential_losers.first, called)
      called << call
      next if potential_losers.size == 1

      potential_losers.delete_if { |board| is_winner?(board, called) }
    end

    score(potential_losers.first, called)
  end
end

four = Four.new

puts "Part 1: #{four.part1()}"
puts "Part 2: #{four.part2()}"
